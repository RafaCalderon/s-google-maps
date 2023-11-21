<script>import { getContext, onDestroy } from "svelte";
import { gmap } from "../stores/googleMaps";
export let options = null;
const { getMap } = getContext("map");
const map = getMap();
const heatmap = new $gmap.visualization.HeatmapLayer({
  map
});
$: {
  if (options)
    heatmap.setOptions(options);
}
onDestroy(() => {
  heatmap.setMap(null);
});
</script>
