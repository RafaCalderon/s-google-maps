<script>import { getContext, onDestroy, createEventDispatcher } from "svelte";
import { gmap } from "../stores/googleMaps";
export let path = null;
export let options = null;
const { getMap } = getContext("map");
const map = getMap();
const dispatch = createEventDispatcher();
const polyline = new $gmap.Polyline({
  map
});
const mouseupListener = polyline.addListener("mouseup", () => {
  path = polyline.getPath().getArray().map((position) => position.toJSON());
});
const clickListener = polyline.addListener("click", (ev) => {
  dispatch("click", ev);
});
$: {
  if (path)
    polyline.setPath(path);
  if (options)
    polyline.setOptions(options);
}
onDestroy(() => {
  polyline.setMap(null);
  clickListener.remove();
  mouseupListener.remove();
});
</script>
