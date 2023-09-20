/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        width: string;
        height: string;
        borderRadius?: string | undefined;
        zoom?: number | null | undefined;
        options?: google.maps.MapOptions | undefined;
        center?: google.maps.LatLngLiteral | null | undefined;
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
export type SGoogleMapProps = typeof __propDef.props;
export type SGoogleMapEvents = typeof __propDef.events;
export type SGoogleMapSlots = typeof __propDef.slots;
export default class SGoogleMap extends SvelteComponent<SGoogleMapProps, SGoogleMapEvents, SGoogleMapSlots> {
}
export {};
