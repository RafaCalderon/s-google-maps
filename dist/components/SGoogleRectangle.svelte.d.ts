/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        options?: google.maps.PolylineOptions | null | undefined;
        bounds?: google.maps.LatLngBoundsLiteral | null | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SGoogleRectangleProps = typeof __propDef.props;
export type SGoogleRectangleEvents = typeof __propDef.events;
export type SGoogleRectangleSlots = typeof __propDef.slots;
export default class SGoogleRectangle extends SvelteComponent<SGoogleRectangleProps, SGoogleRectangleEvents, SGoogleRectangleSlots> {
}
export {};
