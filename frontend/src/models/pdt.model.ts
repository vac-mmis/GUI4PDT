import type { Group, MeshStandardMaterial } from "three";

import { PDTObject, type ObjectJSON } from "@/models/object.model";
import { loadMaterial, loadModel } from "@/World/systems/loader";
import type { MaterialFile } from "@/models/material.model";

export interface PDTJSON {
    name: string;
    models: { name: string; content: string }[];
    materials: MaterialFile[];
    objects: ObjectJSON[];
}

export class PDT {
    name: string;
    models!: Group[];
    materials!: MeshStandardMaterial[];
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
        this.materials = await Promise.all(
            pdt.materials.map(async (material) => loadMaterial(material))
        );
        this.objects = pdt.objects.map(
            (obj: ObjectJSON) => new PDTObject(obj, this.models, this.materials)
        );
    }

    public getObjects = (): PDTObject[] => this.objects;

    updateObjects = (fun: Function): void => this.objects.forEach((obj: PDTObject) => fun(obj));
}
