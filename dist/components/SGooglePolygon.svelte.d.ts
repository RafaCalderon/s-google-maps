/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        path?: google.maps.LatLngLiteral[] | null | undefined;
        options?: google.maps.PolygonOptions | null | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SGooglePolygonProps = typeof __propDef.props;
export type SGooglePolygonEvents = typeof __propDef.events;
export type SGooglePolygonSlots = typeof __propDef.slots;
export default class SGooglePolygon extends SvelteComponent<SGooglePolygonProps, SGooglePolygonEvents, SGooglePolygonSlots> {
}
export {};
