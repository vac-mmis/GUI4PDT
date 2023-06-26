import type { Datum, PlotData, PlotType, TypedArray } from "plotly.js-dist-min";
import { Location, type LocationJSON } from "@/models/location.model";
import { Type, type TypeJSON } from "@/models/type.model";
import type { RotationJSON } from "@/models/rotation.model";
import type { MaterialJSON } from "@/models/material.model";
import { getMean } from "@/services/dist.services";

export type ObjectJSON = {
    id: number;
    type: TypeJSON;
    location: LocationJSON;
    rotation: RotationJSON;
    material: MaterialJSON;
    scale: [number, number, number];
};

const objToData = (obj: ObjectJSON, models?: Partial<PlotData>[]): ObjectPlot[] => {
    if (models === undefined) {
        return [];
    }

    const loc = getMean(obj.location.distribution);

    if (typeof obj.type === "string") {
        const model = models.find((model) => model.name === obj.type);
        if (model === undefined) {
            return [];
        } else {
            return [new ObjectPlot(obj.id, model, loc, obj.scale, 1)];
        }
    } else {
        const dist = obj.type.distribution;
        const res = Object.entries(dist.mass)
            .map((type: [string, number]) => {
                const model = models.find((m) => {
                    return m.name === type[0];
                });
                if (model === undefined) {
                    return undefined;
                } else {
                    return new ObjectPlot(obj.id, model, loc, obj.scale, type[1]);
                }
            })
            .filter((model): model is ObjectPlot => model !== undefined);
        return res.length === 0 ? [] : res;
    }
};

class ObjectPlot implements Partial<PlotData> {
    name: string | undefined;
    x: Datum[] | Datum[][] | TypedArray | undefined;
    y: Datum[] | Datum[][] | TypedArray | undefined;
    z: Datum[] | Datum[][] | Datum[][][] | TypedArray | undefined;
    type: PlotType | undefined;
    i: TypedArray | undefined;
    j: TypedArray | undefined;
    k: TypedArray | undefined;
    opacity: number | undefined;
    customdata: Datum[] | Datum[][] | undefined;

    constructor(
        objID: number,
        model: Partial<PlotData>,
        loc: number[],
        scale: number[],
        p: number
    ) {
        this.name = model.name;
        this.x = (model.x as number[]).map((x) => x * scale[0] + loc[0]);
        this.y = (model.y as number[]).map((y) => y * scale[1] + loc[1]);
        this.z = (model.z as number[]).map((z) => z * scale[2] + loc[2]);
        this.type = model.type;
        this.i = model.i;
        this.j = model.j;
        this.k = model.k;
        this.opacity = p;
        this.customdata = [objID];
    }
}

export class PDTObject {
    id: number;
    obj: ObjectPlot[];
    type: Type;
    location: Location;
    rotation?: PlotData;
    material?: PlotData;

    constructor(obj: ObjectJSON, models?: Partial<PlotData>[]) {
        this.id = obj.id;
        this.location = new Location(this.id, obj.location);
        this.type = new Type(this.id, obj.type);
        this.obj = objToData(obj, models);
    }
}
