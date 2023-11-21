<script lang="ts">
  import SGoogleMap from "$lib/components/SGoogleMap.svelte";
  import { load, gmap } from "$lib/stores/googleMaps.js";
  import SGoogleMarker from "$lib/components/SGoogleMarker.svelte";

  const options: google.maps.MapOptions = {
    zoom: 17,
  };

  let position = { lat: -35.433715, lng: -71.67624 };
</script>

{JSON.stringify($gmap)}
{#await load("")}
  Cargando mapa
{:then _}
  <SGoogleMap
    width="400px"
    height="400px"
    zoom={17}
    center={{ lat: -35.433715, lng: -71.67624 }}
  >
    <SGoogleMarker
      options={{ draggable: true }}
      bind:position
    />
  </SGoogleMap>
{:catch error}
  {error}
{/await}
