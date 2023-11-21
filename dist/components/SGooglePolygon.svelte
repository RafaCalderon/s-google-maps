<script>import { getContext, onDestroy, createEventDispatcher } from "svelte";
import { gmap } from "../stores/googleMaps";
export let path = null;
export let options = null;
const { getMap } = getContext("map");
const map = getMap();
const dispatch = createEventDispatcher();
const polygon = new $gmap.Polygon({
  map
});
const mouseupListener = polygon.addListener("mouseup", () => {
  path = polygon.getPath().getArray().map((position) => position.toJSON());
});
const clickListener = polygon.addListener("click", (ev) => {
  dispatch("click", ev);
});
$: {
  if (path)
    polygon.setPath(path);
  if (options)
    polygon.setOptions(options);
}
onDestroy(() => {
  polygon.setMap(null);
  clickListener.remove();
  mouseupListener.remove();
});
</script>
