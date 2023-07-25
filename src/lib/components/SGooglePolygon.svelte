<script lang="ts">
  // Svelte
  import {getContext, onDestroy, createEventDispatcher} from "svelte";

  // GmapApi
  import {gmapApi} from "$lib/stores/gmapLoader";

  // Props

  export let path: google.maps.LatLngLiteral[] | null = null;
  export let options: google.maps.PolygonOptions | null = null;

  // Context

  const {getMap} = getContext<{ getMap: () => google.maps.Map }>("map");

  // Data

  const map = getMap();
  const dispatch = createEventDispatcher();
  const polygon = new gmapApi.maps.Polygon({
    map: map,
  });

  // Listeners

  const mouseupListener = polygon.addListener("mouseup", () => {
    path = polygon.getPath().getArray().map(position => position.toJSON());
  });

  const clickListener = polygon.addListener("click", (ev: google.maps.MapMouseEvent) => {
    dispatch("click", ev);
  });

  // Reactives

  $: {
    if (path) polygon.setPath(path);
    if (options) polygon.setOptions(options);
  }

  // Destroy

  onDestroy(() => {
    polygon.setMap(null);
    clickListener.remove();
    mouseupListener.remove();
  });
</script>
