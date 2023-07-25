<script lang="ts">
  // Svelte
  import {getContext, onDestroy} from "svelte";

  // GmapApi
  import {gmapApi} from "$lib/stores/gmapLoader";

  // Props

  export let options: google.maps.visualization.HeatmapLayerOptions | null = null;

  // Context

  const {getMap} = getContext<{ getMap: () => google.maps.Map }>("map");

  // Data

  const map = getMap();
  const heatmap = new gmapApi.maps.visualization.HeatmapLayer({
    map: map,
  });

  // Reactives

  $: {
    if (options) heatmap.setOptions(options);
  }

  // Destroy

  onDestroy(() => {
    heatmap.setMap(null);
  });
</script>
