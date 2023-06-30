import { PDTObject, type ObjectJSON } from "./object.model";
import type { Group } from "three";
import { loadModel } from "@/World/systems/loader";
export interface PDTJSON {
    name: string;
    models: { name: string; content: string }[];
    objects: ObjectJSON[];
}

export class PDT {
    name: string;
    models!: Group[];
    objects!: PDTObject[];
    bottomTexture?: any;
    depthMap?: any;
    temperature?: any;
    currents?: any;

    constructor(pdt: PDTJSON) {
        this.name = pdt.name;
    }

    public async init(pdt: PDTJSON) {
        this.models = await Promise.all(pdt.models.map(async (model) => loadModel(model)));
        this.objects = pdt.objects.map((obj: ObjectJSON) => new PDTObject(obj, this.models));
    }

    public getObjects(): PDTObject[] {
        return this.objects;
    }

    updateObjects = (fun: Function): void => this.objects.forEach((obj: PDTObject) => fun(obj));

    findObject = (objectID: number): PDTObject | undefined =>
        this.objects.find((obj) => obj.id === objectID);
}
