/// <reference types="google.maps" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        options?: google.maps.visualization.HeatmapLayerOptions | null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SGoogleHeatmapProps = typeof __propDef.props;
export type SGoogleHeatmapEvents = typeof __propDef.events;
export type SGoogleHeatmapSlots = typeof __propDef.slots;
export default class SGoogleHeatmap extends SvelteComponent<SGoogleHeatmapProps, SGoogleHeatmapEvents, SGoogleHeatmapSlots> {
}
export {};
