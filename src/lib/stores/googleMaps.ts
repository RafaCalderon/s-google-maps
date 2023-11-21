// Stores
import { get, writable } from "svelte/store";

// Google Maps
import { type Libraries, Loader } from "@googlemaps/js-api-loader";

export const gmap = writable<typeof google.maps | null>(null);

export async function load(apiKey: string, libraries: Libraries = []) {
  if (get(gmap)) return;
  const loader = new Loader({
    apiKey,
    libraries,
  });
  gmap.set((await loader.load()).maps);
}

export default {
  load,
  gmap,
};
