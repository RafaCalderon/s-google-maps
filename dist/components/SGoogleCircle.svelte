<script>import { getContext, onDestroy, createEventDispatcher } from "svelte";
import { gmap } from "../stores/googleMaps";
export let radius = null;
export let center = null;
export let options = null;
const { getMap } = getContext("map");
const map = getMap();
const dispatch = createEventDispatcher();
const circle = new gmap.Circle({
  map
});
const radiusChangedListener = circle.addListener("radius_changed", () => {
  radius = circle.getRadius();
});
const centerChangedListener = circle.addListener("center_changed", () => {
  center = circle.getCenter().toJSON();
});
const clickListener = circle.addListener("click", (ev) => {
  dispatch("click", ev);
});
$: {
  if (radius)
    circle.setRadius(radius);
  if (center)
    circle.setCenter(center);
  if (options)
    circle.setOptions(options);
}
onDestroy(() => {
  circle.setMap(null);
  clickListener.remove();
  centerChangedListener.remove();
  radiusChangedListener.remove();
});
</script>
