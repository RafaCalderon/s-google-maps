/// <reference types="google.maps" />
import { type Libraries } from "@googlemaps/js-api-loader";
export declare let gmap: typeof google.maps | null;
export declare function load(apiKey: string, libraries?: Libraries): Promise<void>;
declare const _default: {
    load: typeof load;
    gmap: null;
};
export default _default;
