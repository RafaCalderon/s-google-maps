/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        path?: google.maps.LatLngLiteral[] | null | undefined;
        options?: google.maps.PolylineOptions | null | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SGooglePolylineProps = typeof __propDef.props;
export type SGooglePolylineEvents = typeof __propDef.events;
export type SGooglePolylineSlots = typeof __propDef.slots;
export default class SGooglePolyline extends SvelteComponent<SGooglePolylineProps, SGooglePolylineEvents, SGooglePolylineSlots> {
}
export {};
