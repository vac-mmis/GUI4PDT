import type { PlotData } from "plotly.js-dist-min";
import { PDTObject, type ObjectJSON } from "./object.model";

export interface PDTJSON {
    name: string;
    models: Partial<PlotData>[];
    objects: ObjectJSON[];
}

export class PDT {
    name: string;
    models: Partial<PlotData>[];
    objects: PDTObject[];
    bottomTexture?: Partial<PlotData>;
    depthMap?: Partial<PlotData>;
    temperature?: Partial<PlotData>;
    currents?: Partial<PlotData>;

    constructor(pdt: PDTJSON) {
        this.name = pdt.name;
        this.models = pdt.models;
        this.objects = pdt.objects.map((obj: ObjectJSON) => new PDTObject(obj, this.models));
    }

    getPlot = (): Partial<PlotData>[] =>
        this.objects.flatMap((obj: PDTObject) => [obj.location, ...obj.obj]);

    getObjects = (): PDTObject[] => this.objects;

    updateObjects = (fun: Function): void => this.objects.forEach((obj: PDTObject) => fun(obj));

    findObject = (objectID: number): PDTObject | undefined =>
        this.objects.find((obj) => obj.id === objectID);
}
