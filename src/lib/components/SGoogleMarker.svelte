<script lang="ts">
  // Svelte
  import { getContext, onDestroy, createEventDispatcher, setContext } from "svelte";

  // GmapApi
  import { gmap } from "$lib/stores/googleMaps";

  // Props

  export let options: google.maps.MarkerOptions | null = null;
  export let position: google.maps.LatLngLiteral | null = null;

  // Context

  const { getMap } = getContext<{ getMap: () => google.maps.Map }>("map");
  setContext("marker", {
    getMarker: () => marker,
  });

  // Data

  const map = getMap();
  const dispatch = createEventDispatcher();
  const marker = new gmap.Marker({
    map: map,
  });

  // Listeners

  const mouseupListener = marker.addListener("mouseup", () => {
    position = marker.getPosition().toJSON();
  });

  const clickListener = marker.addListener("click", (ev: google.maps.MapMouseEvent) => {
    dispatch("click", ev);
  });

  // Reactives

  $: {
    if (options) marker.setOptions(options);
    if (position) marker.setPosition(position);
  }

  // Destroy

  onDestroy(() => {
    marker.setMap(null);
    clickListener.remove();
    mouseupListener.remove();
  });
</script>

<slot />
