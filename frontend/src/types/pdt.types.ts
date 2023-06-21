import type { PlotData } from "plotly.js-dist-min";

export interface ObjectVisibility {
    show: boolean;
    location: boolean;
    type: boolean;
    material: boolean;
}

export interface PDTObject {
    id: number;
    type: PlotData;
    obj: PlotData[];
    location: Partial<PlotData>;
    rotation: PlotData;
    material: PlotData;
}

export interface PDT {
    id: number;
    name: string;
    PDTDir: string;
    models: Partial<PlotData>[];
    objects: PDTObject[];
    bottomTexture?: Partial<PlotData>;
    depthMap?: Partial<PlotData>;
    temperature?: Partial<PlotData>;
    currents?: Partial<PlotData>;
}
