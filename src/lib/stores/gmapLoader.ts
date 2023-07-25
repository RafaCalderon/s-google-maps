import {type Libraries, Loader} from "@googlemaps/js-api-loader";

export let gmapApi: typeof google | null = null;

export async function load(apiKey: string, libraries: Libraries = []) {
  if (gmapApi) return;
  const loader = new Loader({
    apiKey,
    libraries,
  });
  gmapApi = await loader.load();
}

export default {
  load,
  gmapApi,
};
