<script>import { getContext, onDestroy, onMount } from "svelte";
import { gmap } from "../stores/googleMaps";
export let show = false;
export let options = null;
const { getMap } = getContext("map");
const markerContext = getContext("marker");
const map = getMap();
const marker = markerContext?.getMarker() ?? null;
let infoWindowContent = null;
const infoWindow = new gmap.InfoWindow();
onMount(() => {
  infoWindow.setContent(infoWindowContent);
});
let markerClickListener = null;
if (marker)
  markerClickListener = marker.addListener("click", () => show = !show);
const closeClickListener = infoWindow.addListener("closeclick", () => show = false);
function toggle(value) {
  if (value) {
    infoWindow.open({
      map,
      anchor: marker
    });
  } else {
    infoWindow.close();
  }
}
$: {
  if (options)
    infoWindow.setOptions(options);
}
$: {
  toggle(show);
}
onDestroy(() => {
  infoWindow.close();
  closeClickListener.remove();
  markerClickListener?.remove();
});
</script>

<template>
  <div class="s-google-info-window__container">
    <div bind:this={infoWindowContent}>
      <slot />
    </div>
  </div>
</template>

<style>
  .s-google-info-window__container {
    display: none;
  }
</style>
