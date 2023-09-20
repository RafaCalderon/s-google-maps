<script>import { getContext, onDestroy, createEventDispatcher, setContext } from "svelte";
import { gmap } from "../stores/googleMaps";
export let options = null;
export let position = null;
const { getMap } = getContext("map");
setContext("marker", {
  getMarker: () => marker
});
const map = getMap();
const dispatch = createEventDispatcher();
const marker = new gmap.Marker({
  map
});
const mouseupListener = marker.addListener("mouseup", () => {
  position = marker.getPosition().toJSON();
});
const clickListener = marker.addListener("click", (ev) => {
  dispatch("click", ev);
});
$: {
  if (options)
    marker.setOptions(options);
  if (position)
    marker.setPosition(position);
}
onDestroy(() => {
  marker.setMap(null);
  clickListener.remove();
  mouseupListener.remove();
});
</script>

<slot />
