<script lang="ts">
  // Svelte
  import {getContext, onDestroy, createEventDispatcher} from "svelte";

  // GmapApi
  import {gmapApi} from "$lib/stores/gmapLoader";

  // Props

  export let radius: number | null = null;
  export let center: google.maps.LatLngLiteral | null = null;
  export let options: google.maps.PolylineOptions | null = null;

  // Context

  const {getMap} = getContext<{ getMap: () => google.maps.Map }>("map");

  // Data

  const map = getMap();
  const dispatch = createEventDispatcher();
  const circle = new gmapApi.maps.Circle({
    map: map,
  });

  // Listeners

  const radiusChangedListener = circle.addListener("radius_changed", () => {
    radius = circle.getRadius();
  });

  const centerChangedListener = circle.addListener("center_changed", () => {
    center = circle.getCenter().toJSON();
  });

  const clickListener = circle.addListener("click", (ev: google.maps.MapMouseEvent) => {
    dispatch("click", ev);
  });

  // Reactives

  $: {
    if (radius) circle.setRadius(radius);
    if (center) circle.setCenter(center);
    if (options) circle.setOptions(options);
  }

  // Destroy

  onDestroy(() => {
    circle.setMap(null);
    clickListener.remove();
    centerChangedListener.remove();
    radiusChangedListener.remove();
  });
</script>
