import { type Libraries, Loader } from "@googlemaps/js-api-loader";

export let gmap: typeof google.maps | null = null;

export async function load(apiKey: string, libraries: Libraries = []) {
  if (gmap) return;
  const loader = new Loader({
    apiKey,
    libraries,
  });
  gmap = (await loader.load()).maps;
}

export default {
  load,
  gmap,
};
