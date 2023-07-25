<script lang="ts">
  import {setContext} from "svelte";
  import {writable} from "svelte/store";
  import gmapLoader, {gmapApi} from "$lib/stores/gmapLoader";
  import SGoogleMap from "$lib/components/SGoogleMap.svelte";
  import SGoogleMarker from "$lib/components/SGoogleMarker.svelte";
  import SGooglePolygon from "$lib/components/SGooglePolygon.svelte";
  import SGoogleInfoWindow from "$lib/components/SGoogleInfoWindow.svelte";
  import SGoogleHeatmap from "$lib/components/SGoogleHeatmap.svelte";

  let numero = writable({color: "rojo"});

  setContext("numero", numero);

  let position: google.maps.LatLngLiteral = {
    lat: -35.4346806,
    lng: -71.6698128,
  };

  const options: google.maps.MarkerOptions = {
    draggable: true,
    clickable: true,
  };

  const options2: google.maps.PolygonOptions = {
    editable: true,
    draggable: true,
  }

  const options3: google.maps.InfoWindowOptions = {
    position: {
      lat: -35.43510893770154,
      lng: -71.67027413995056,
    }
  }

  function onClick(ev: CustomEvent<google.maps.MapMouseEvent>) {
    console.log(ev.detail);
  }

  let path: google.maps.LatLngLiteral[] = [
    {
      lat: -35.43510893770154,
      lng: -71.67027413995056,
    },
    {
      lat: -35.4346806,
      lng: -71.6698128,
    },
    {
      lat: -35.43551104857221,
      lng: -71.66943729073792,
    },
  ];

  const options5: google.maps.MapOptions = {
    center: {
      lat: -35.4346806,
      lng: -71.6698128,
    },
    zoom: 17,
  }

  function update() {
    show = !show
  }
  let show = false;

  $: options4 =() => {
    if(!gmapApi) return;
    return {
      data: [
        new gmapApi.maps.LatLng(37.782, -122.447),
        new gmapApi.maps.LatLng(37.782, -122.445),
        new gmapApi.maps.LatLng(37.782, -122.443),
        new gmapApi.maps.LatLng(37.782, -122.441),
        new gmapApi.maps.LatLng(37.782, -122.439),
        new gmapApi.maps.LatLng(37.782, -122.437),
        new gmapApi.maps.LatLng(37.782, -122.435),
        new gmapApi.maps.LatLng(37.785, -122.447),
        new gmapApi.maps.LatLng(37.785, -122.445),
        new gmapApi.maps.LatLng(37.785, -122.443),
        new gmapApi.maps.LatLng(37.785, -122.441),
        new gmapApi.maps.LatLng(37.785, -122.439),
        new gmapApi.maps.LatLng(37.785, -122.437),
        new gmapApi.maps.LatLng(37.785, -122.435)
      ]
    }
  }
</script>

<main>
  {#await gmapLoader.load("", ["visualization"]) then data}
    <SGoogleMap options={options5} width="400px" height="800px">
      <SGoogleMarker
        bind:position={position}
        options={options}
        on:click={onClick}
      >
        <SGoogleInfoWindow bind:show={show} options={options3}>
          <p>Hola <span style="color: red">Mundo</span></p>
        </SGoogleInfoWindow>
      </SGoogleMarker>
      <SGooglePolygon
        options={options2}
        bind:path={path}
      />
      <SGoogleHeatmap options={options4()}/>
    </SGoogleMap>
  {/await}
  {show}
  <button on:click={update}>Update</button>
</main>
