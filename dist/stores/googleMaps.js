import { Loader } from "@googlemaps/js-api-loader";
export let gmap = null;
export async function load(apiKey, libraries = []) {
    if (gmap)
        return;
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
