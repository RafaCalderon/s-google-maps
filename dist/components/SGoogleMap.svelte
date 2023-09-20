<script>import { onMount, setContext, createEventDispatcher, onDestroy } from "svelte";
import { gmap } from "../stores/googleMaps";
export let width;
export let height;
export let borderRadius = "0";
export let zoom = null;
export let options = null;
export let center = null;
setContext("map", {
  getMap: () => map
});
let mounted = false;
let map = null;
let mapDiv = null;
const dispatch = createEventDispatcher();
let clickListener = null;
let dragEndListener = null;
let zoomChangedListener = null;
onMount(() => {
  if (!mapDiv || !gmap)
    return;
  map = new gmap.Map(mapDiv);
  clickListener = map.addListener("click", (ev) => {
    dispatch("click", ev);
  });
  dragEndListener = map.addListener("dragend", () => {
    center = map.getCenter().toJSON();
  });
  zoomChangedListener = map.addListener("zoom_changed", () => {
    zoom = map.getZoom();
  });
  mounted = true;
});
$:
  wrapperStyle = `width: ${width}; height: ${height}`;
$:
  containerStyle = `width: ${width}; height: ${height}; border-radius: ${borderRadius}`;
$: {
  if (map)
    map.setOptions(options);
  if (map && zoom)
    map.setZoom(zoom);
  if (map && center)
    map.setCenter(center);
}
onDestroy(() => {
  map = null;
  if (clickListener)
    clickListener.remove();
  if (dragEndListener)
    dragEndListener.remove();
  if (zoomChangedListener)
    zoomChangedListener.remove();
});
</script>

<div
  style={wrapperStyle}
  class="s-google-map__wrapper"
>
  <div
    bind:this={mapDiv}
    style={containerStyle}
    class="s-google-map__container"
  />
  {#if mounted}
    <slot />
  {/if}
</div>

<style>
  .s-google-map__container {
    overflow: hidden;
  }
</style>
