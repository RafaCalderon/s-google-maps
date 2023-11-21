<script lang="ts">
  // Svelte
  import { getContext, onDestroy, createEventDispatcher } from "svelte";

  // GmapApi
  import { gmap } from "$lib/stores/googleMaps";

  // Props

  export let path: google.maps.LatLngLiteral[] | null = null;
  export let options: google.maps.PolylineOptions | null = null;

  // Context

  const { getMap } = getContext<{ getMap: () => google.maps.Map }>("map");

  // Data

  const map = getMap();
  const dispatch = createEventDispatcher();
  const polyline = new $gmap.Polyline({
    map: map,
  });

  // Listeners

  const mouseupListener = polyline.addListener("mouseup", () => {
    path = polyline
      .getPath()
      .getArray()
      .map((position) => position.toJSON());
  });

  const clickListener = polyline.addListener("click", (ev: google.maps.MapMouseEvent) => {
    dispatch("click", ev);
  });

  // Reactives

  $: {
    if (path) polyline.setPath(path);
    if (options) polyline.setOptions(options);
  }

  // Destroy

  onDestroy(() => {
    polyline.setMap(null);
    clickListener.remove();
    mouseupListener.remove();
  });
</script>
