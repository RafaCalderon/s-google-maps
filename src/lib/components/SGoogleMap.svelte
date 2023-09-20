<script lang="ts">
  // Svelte
  import { onMount, setContext, createEventDispatcher, onDestroy } from "svelte";

  // GmapApi
  import { gmap } from "$lib/stores/googleMaps";

  // Props

  export let width: string;
  export let height: string;
  export let borderRadius = "0";
  export let zoom: number | null = null;
  export let options: google.maps.MapOptions = null;
  export let center: google.maps.LatLngLiteral | null = null;

  // Context

  setContext("map", {
    getMap: () => map,
  });

  // Data

  let mounted = false;
  let map: google.maps.Map | null = null;
  let mapDiv: HTMLDivElement | null = null;
  const dispatch = createEventDispatcher();
  let clickListener: google.maps.MapsEventListener | null = null;
  let dragEndListener: google.maps.MapsEventListener | null = null;
  let zoomChangedListener: google.maps.MapsEventListener | null = null;

  // Mounted

  onMount(() => {
    if (!mapDiv || !gmap) return;
    map = new gmap.Map(mapDiv);
    clickListener = map.addListener("click", (ev: google.maps.MapMouseEvent) => {
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

  // Reactives

  $: wrapperStyle = `width: ${width}; height: ${height}`;
  $: containerStyle = `width: ${width}; height: ${height}; border-radius: ${borderRadius}`;
  $: {
    if (map) map.setOptions(options);
    if (map && zoom) map.setZoom(zoom);
    if (map && center) map.setCenter(center);
  }

  // Destroy

  onDestroy(() => {
    map = null;
    if (clickListener) clickListener.remove();
    if (dragEndListener) dragEndListener.remove();
    if (zoomChangedListener) zoomChangedListener.remove();
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
