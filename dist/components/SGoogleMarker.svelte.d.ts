/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        options?: google.maps.MarkerOptions | null | undefined;
        position?: google.maps.LatLngLiteral | null | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SGoogleMarkerProps = typeof __propDef.props;
export type SGoogleMarkerEvents = typeof __propDef.events;
export type SGoogleMarkerSlots = typeof __propDef.slots;
export default class SGoogleMarker extends SvelteComponent<SGoogleMarkerProps, SGoogleMarkerEvents, SGoogleMarkerSlots> {
}
export {};
