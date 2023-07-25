import type {Libraries} from "@googlemaps/js-api-loader";

export declare module "s-google-maps" {
  export declare const gmapApi = typeof google | null;

  export declare function load(apiKey: string, libraries: Libraries): Promise<void>;
}

//
// declare module '@vue/runtime-core' {
//   export interface GlobalComponents {
//     VGoogleMap: typeof IVGoogleMap;
//     VGoogleCircle: VGoogleCircle;
//     VGoogleMarker: typeof IVGoogleMarker;
//     VGoogleHeatmap: typeof IVGoogleHeatmap;
//     VGooglePolygon: typeof IVGooglePolygon;
//     VGooglePolyline: typeof IVGooglePolyline;
//     VGoogleRectangle: typeof IVGoogleRectangle;
//     VGoogleInfoWindow: typeof IVGoogleInfoWindow;
//   }
// }
