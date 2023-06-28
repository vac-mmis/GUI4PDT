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

export class ObjectPlot implements Partial<PlotData> {
    name: string | undefined;
    x!: number[];
    y!: number[];
    z!: number[];
    type: PlotType | undefined;
    i?: TypedArray;
    j?: TypedArray;
    k?: TypedArray;
    opacity: number | undefined;
    customdata: [number];
    visible: boolean;

    constructor(
        objID: number,
        model?: Partial<PlotData>,
        loc?: number[],
        scale?: number[],
        p?: number,
        visibility = true
    ) {
        this.visible = visibility;
        this.customdata = [objID];
        if (model === undefined || scale === undefined) {
            return;
        }
        this.name = model.name;
        this.x = (model.x as number[]).map((x) => x * scale[0] + (loc ? loc[0] : 0));
        this.y = (model.y as number[]).map((y) => y * scale[1] + (loc ? loc[1] : 0));
        this.z = (model.z as number[]).map((z) => z * scale[2] + (loc ? loc[2] : 0));
        this.type = model.type;
        this.i = model.i;
        this.j = model.j;
        this.k = model.k;
        this.opacity = p;
    }

    static copy(plot: ObjectPlot): ObjectPlot {
        const copyObj = new ObjectPlot(plot.customdata[0]);
        copyObj.name = plot.name;
        copyObj.x = [...plot.x];
        copyObj.y = [...plot.y];
        copyObj.z = [...plot.z];
        copyObj.type = plot.type;
        copyObj.i = plot.i;
        copyObj.j = plot.j;
        copyObj.k = plot.k;
        copyObj.opacity = plot.opacity;
        copyObj.customdata = plot.customdata;
        return copyObj;
    }

    public toggleLocation(visibility = true) {
        this.visible = visibility;
    }
}

export class PDTObject {
    id: number;
    obj!: ObjectPlot[];
    type!: Type;
    location!: Location;
    rotation?: PlotData;
    material?: PlotData;

    constructor(obj: ObjectJSON | number, models?: Partial<PlotData>[]) {
        if (typeof obj === "number") {
            this.id = obj;
            return;
        } else {
            this.id = obj.id;
            this.obj = objToData(obj, models);
        }
        this.location = new Location(this.id, models, obj.location);
        this.type = new Type(this.id, obj.type);
    }

    static copy(object: PDTObject): PDTObject {
        const copyObj = new PDTObject(object.id);
        copyObj.id = object.id;
        copyObj.obj = object.obj.map((obj) => ObjectPlot.copy(obj));
        copyObj.type = Type.copy(object.type);
        copyObj.location = Location.copy(object.location);
        copyObj.rotation = object.rotation ? { ...object.rotation } : undefined;
        copyObj.material = object.material ? { ...object.material } : undefined;
        return copyObj;
    }
}
