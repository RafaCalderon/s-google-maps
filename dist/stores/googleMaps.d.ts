/// <reference types="google.maps" />
/// <reference types="svelte" />
import { type Libraries } from "@googlemaps/js-api-loader";
export declare const gmap: import("svelte/store").Writable<typeof google.maps | null>;
export declare function load(apiKey: string, libraries?: Libraries): Promise<void>;
declare const _default: {
    load: typeof load;
    gmap: import("svelte/store").Writable<typeof google.maps | null>;
};
export default _default;
