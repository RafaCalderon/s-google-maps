<script>import { getContext, onDestroy, createEventDispatcher } from "svelte";
import { gmap } from "../stores/googleMaps";
export let options = null;
export let bounds = null;
const { getMap } = getContext("map");
const map = getMap();
const dispatch = createEventDispatcher();
const rectangle = new gmap.Rectangle({
  map
});
const boundsChangedListener = rectangle.addListener("bounds_changed", () => {
  bounds = rectangle.getBounds().toJSON();
});
const clickListener = rectangle.addListener("click", (ev) => {
  dispatch("click", ev);
});
$: {
  if (bounds)
    rectangle.setBounds(bounds);
  if (options)
    rectangle.setOptions(options);
}
onDestroy(() => {
  rectangle.setMap(null);
  clickListener.remove();
  boundsChangedListener.remove();
});
</script>
