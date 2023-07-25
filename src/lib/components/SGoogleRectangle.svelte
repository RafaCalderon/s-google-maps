<script lang="ts">
  // Svelte
  import {getContext, onDestroy, createEventDispatcher} from "svelte";

  // GmapApi
  import {gmapApi} from "$lib/stores/gmapLoader";

  // Props

  export let options: google.maps.PolylineOptions | null = null;
  export let bounds: google.maps.LatLngBoundsLiteral | null = null;

  // Context

  const {getMap} = getContext<{ getMap: () => google.maps.Map }>("map");

  // Data

  const map = getMap();
  const dispatch = createEventDispatcher();
  const rectangle = new gmapApi.maps.Rectangle({
    map: map,
  });

  // Listeners

  const boundsChangedListener = rectangle.addListener("bounds_changed", () => {
    bounds = rectangle.getBounds().toJSON();
  });

  const clickListener = rectangle.addListener("click", (ev: google.maps.MapMouseEvent) => {
    dispatch("click", ev);
  });

  // Reactives

  $: {
    if (bounds) rectangle.setBounds(bounds);
    if (options) rectangle.setOptions(options);
  }

  // Destroy

  onDestroy(() => {
    rectangle.setMap(null);
    clickListener.remove();
    boundsChangedListener.remove();
  });
</script>
