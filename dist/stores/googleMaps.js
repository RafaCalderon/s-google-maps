// Stores
import { get, writable } from "svelte/store";
// Google Maps
import { Loader } from "@googlemaps/js-api-loader";
export const gmap = writable(null);
export async function load(apiKey, libraries = []) {
    if (get(gmap))
        return;
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
