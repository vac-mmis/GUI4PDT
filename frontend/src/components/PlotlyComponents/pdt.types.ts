import type { Data } from "plotly.js-dist-min";

export interface PDTObject {
    id: number;
    type: Data;
    location: Partial<Data>;
    rotation: Data;
    material: Data;
}

export interface PDT {
    name: string;
    PDTDir: string;
    models: Partial<Plotly.Data>[];
    objects: PDTObject[];
    bottomTexture?: Partial<Plotly.Data>;
    depthMap?: Partial<Plotly.Data>;
    temperature?: Partial<Plotly.Data>;
    currents?: Partial<Plotly.Data>;
}
