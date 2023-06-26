import type {
    ColorScale,
    Datum,
    PlotData,
    PlotMarker,
    PlotType,
    TypedArray,
} from "plotly.js-dist-min";
import { multivariateNormal, uniformContinuous } from "@/services/dist.services";
import type { MultivariateNormal, UniformContinuous } from "@/services/dist.services";
import type { BoxPlotMarker } from "plotly.js/lib/traces/box";
import type { PDTObject } from "@/models/object.model";

export type LocationJSON = {
    distribution: MultivariateNormal | UniformContinuous;
};

export const toggleLocation = (showLocation: boolean) => {
    return (obj: PDTObject) => obj.location.toggleLocation(showLocation);
};

export class Location implements Partial<PlotData> {
    x: Datum[] | Datum[][] | TypedArray | undefined;
    y: Datum[] | Datum[][] | TypedArray | undefined;
    z: Datum[] | Datum[][] | Datum[][][] | TypedArray | undefined;
    visible?: boolean | "legendonly" | undefined;
    customdata?: Datum[] | Datum[][] | undefined;
    mode?:
        | "number"
        | "text"
        | "delta"
        | "gauge"
        | "lines"
        | "markers"
        | "lines+markers"
        | "text+markers"
        | "text+lines"
        | "text+lines+markers"
        | "none"
        | "number+delta"
        | "gauge+number"
        | "gauge+number+delta"
        | "gauge+delta"
        | undefined;
    type: PlotType | undefined;
    i?: TypedArray | undefined;
    j?: TypedArray | undefined;
    k?: TypedArray | undefined;
    opacity?: number | undefined;
    marker?: Partial<PlotMarker> | Partial<BoxPlotMarker> | undefined;
    flatshading?: boolean;
    intensity?: number[];
    colorscale?: ColorScale | undefined;
    showscale?: boolean | undefined;

    public toggleLocation(showLocation: boolean) {
        this.visible = showLocation;
        if (this.marker) {
            let marker = this.marker as PlotMarker;
            marker.colorbar = {};
            marker.showscale = false;
            this.marker = marker;
        }
    }

    constructor(objID: number, loc: LocationJSON) {
        this.visible = false;
        this.customdata = [objID];

        const dist = loc.distribution;
        if (dist.representation === "multivariate-normal") {
            const dataPoints = multivariateNormal(dist);
            this.x = dataPoints[0];
            this.y = dataPoints[1];
            this.z = dataPoints[2];
            this.mode = "markers";
            this.type = "scatter3d";
            this.opacity = 0.5;
            this.marker = {
                color: dataPoints[3],
                colorscale: "Viridis",
                size: 2,
                showscale: false,
            };
        } else {
            const dataPoints = uniformContinuous(dist);
            this.x = dataPoints[0];
            this.y = dataPoints[1];
            this.z = dataPoints[2];
            this.visible = true;
            this.marker = undefined;
            this.i = Float64Array.from([7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2]);
            this.j = Float64Array.from([3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3]);
            this.k = Float64Array.from([0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6]);
            this.customdata = [objID];
            this.type = "mesh3d";
            this.opacity = 0.5;
            this.flatshading = true;
            this.intensity = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
            this.colorscale = "Viridis";
            this.showscale = false;
            this.marker = {
                color: dataPoints[3],
                colorscale: "Viridis",
                size: 2,
                showscale: false,
            };
        }
    }
}
