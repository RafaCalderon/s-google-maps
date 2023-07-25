<template>
  <div class="s-google-info-window__container">
    <div bind:this={infoWindowContent}>
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
  // Svelte
  import {getContext, onDestroy, onMount} from "svelte";

  // GmapApi
  import {gmapApi} from "$lib/stores/gmapLoader";

  // Props

  export let show = false;
  export let options: google.maps.InfoWindowOptions | null = null;

  // Context

  const {getMap} = getContext<{ getMap: () => google.maps.Map }>("map");
  const markerContext = getContext<{ getMarker?: () => google.maps.Marker }>("marker");

  // Data

  const map = getMap();
  const marker = markerContext?.getMarker() ?? null;
  let infoWindowContent: HTMLDivElement | null = null;
  const infoWindow = new gmapApi.maps.InfoWindow();

  // Mounted

  onMount(() => {
    infoWindow.setContent(infoWindowContent)
  })

  // Listeners

  let markerClickListener: google.maps.MapsEventListener | null = null;
  if (marker) markerClickListener = marker.addListener("click", () => show = !show);
  const closeClickListener = infoWindow.addListener("closeclick", () => show = false);

  // Methods

  function toggle(value: boolean) {
    if (value) {
      infoWindow.open({
        map: map,
        anchor: marker,
      });
    } else {
      infoWindow.close();
    }
  }

  // Reactives

  $: {
    if (options) infoWindow.setOptions(options);
  }

  $: {
    toggle(show);
  }

  // Destroy

  onDestroy(() => {
    infoWindow.close();
    closeClickListener.remove();
    markerClickListener?.remove();
  });
</script>

<style>
  .s-google-info-window__container {
    display: none;
  }
</style>
