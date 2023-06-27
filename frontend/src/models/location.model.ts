import type {
    ColorScale,
    ColorBar,
    Font,
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
    x: number[];
    y: number[];
    z: number[];
    visible?: boolean | "legendonly";
    customdata: [number];
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
    type?: PlotType;
    i?: TypedArray;
    j?: TypedArray;
    k?: TypedArray;
    opacity?: number;
    marker?: Partial<PlotMarker> | Partial<BoxPlotMarker>;
    flatshading?: boolean;
    intensity?: number[];
    colorscale?: ColorScale;
    showscale?: boolean;

    public toggleLocation(showLocation: boolean, showScale = false) {
        this.visible = showLocation;
        if (this.marker) {
            let marker = this.marker as PlotMarker;
            marker.showscale = showScale;
            marker.colorbar = showScale
                ? ({
                      y: -0.25,
                      orientation: "h",
                      yanchor: "bottom",
                      title: "Location Density",
                      titleside: "bottom",
                      titlefont: {
                          size: 10,
                      } as Font,
                      thickness: 20, // Adjust the thickness of the color scale bar
                      xpad: 10, // Add padding between the color scale bar and the plot
                      ypad: 0, // Set the y padding of the color scale bar to 0
                  } as Partial<ColorBar>)
                : {};
            this.marker = marker;
        }
    }

    constructor(objID: number, loc?: LocationJSON) {
        this.visible = false;
        this.customdata = [objID];
        this.showscale = false;
        this.opacity = 0.5;

        if (loc === undefined) {
            this.x = [];
            this.y = [];
            this.z = [];
            return;
        }
        const dist = loc.distribution;
        if (dist.representation === "multivariate-normal") {
            const dataPoints = multivariateNormal(dist);
            this.x = dataPoints[0];
            this.y = dataPoints[1];
            this.z = dataPoints[2];
            this.mode = "markers";
            this.type = "scatter3d";
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
            this.i = Float64Array.from([7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2]);
            this.j = Float64Array.from([3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3]);
            this.k = Float64Array.from([0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6]);
            this.type = "mesh3d";
            this.opacity = 0.5;
            this.flatshading = true;
            this.intensity = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
            this.colorscale = "Viridis";
            this.marker = {
                color: dataPoints[3],
                colorscale: "Viridis",
                size: 2,
                showscale: false,
            };
        }
    }

    static copy(loc: Location): Location {
        const copyLocation = new Location(loc.customdata[0]);
        copyLocation.x = [...loc.x];
        copyLocation.y = [...loc.y];
        copyLocation.z = [...loc.z];
        copyLocation.visible = loc.visible;
        copyLocation.marker = { ...loc.marker };
        copyLocation.type = loc.type;
        copyLocation.mode = loc.mode;
        copyLocation.customdata = [...loc.customdata];
        copyLocation.opacity = loc.opacity;
        copyLocation.i = loc.i;
        copyLocation.j = loc.j;
        copyLocation.k = loc.k;
        copyLocation.flatshading = loc.flatshading;
        copyLocation.showscale = loc.showscale;
        copyLocation.intensity = loc.intensity;
        copyLocation.colorscale = loc.colorscale;
        return copyLocation;
    }
}
