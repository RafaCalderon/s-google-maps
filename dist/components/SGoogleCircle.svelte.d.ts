/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        radius?: number | null | undefined;
        center?: google.maps.LatLngLiteral | null | undefined;
        options?: google.maps.PolylineOptions | null | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SGoogleCircleProps = typeof __propDef.props;
export type SGoogleCircleEvents = typeof __propDef.events;
export type SGoogleCircleSlots = typeof __propDef.slots;
export default class SGoogleCircle extends SvelteComponent<SGoogleCircleProps, SGoogleCircleEvents, SGoogleCircleSlots> {
}
export {};
