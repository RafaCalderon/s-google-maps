/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        show?: boolean | undefined;
        options?: google.maps.InfoWindowOptions | null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SGoogleInfoWindowProps = typeof __propDef.props;
export type SGoogleInfoWindowEvents = typeof __propDef.events;
export type SGoogleInfoWindowSlots = typeof __propDef.slots;
export default class SGoogleInfoWindow extends SvelteComponent<SGoogleInfoWindowProps, SGoogleInfoWindowEvents, SGoogleInfoWindowSlots> {
}
export {};
