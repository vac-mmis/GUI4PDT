import { PDTObject, type ObjectJSON, tick } from "@/models/object.model";
import { makeRepresentation, type Representation } from "./Representations";
import { Group } from "three";

import { materialStore } from "@/store/material.store";
export interface PDTJSON {
    name: string;
    objects: ObjectJSON[];
    elevationMap?: [number, number, number, number][];
}

export class PDT extends Group {
    name: string;
    length: number;
    private objects: PDTObject[];
    private elevationMap?: Representation;

    constructor(pdt: PDTJSON) {
        super();
        this.name = pdt.name;
        this.userData.type = "PDT";
        this.length = pdt.objects[0].location.length;
        // Add objects as new children group
        this.objects = pdt.objects.map((obj: ObjectJSON) => new PDTObject(obj));
        this.add(new Group().add(...this.objects));
        // Add elevation map as new children
        const { find } = materialStore();
        const waterMaterial = find("water");
        waterMaterial.transparent = true;
        waterMaterial.opacity = 0.5;
        if (pdt.elevationMap) {
            this.elevationMap = makeRepresentation("surface", pdt.elevationMap, waterMaterial);
            this.add(this.elevationMap);
        }
    }

    public getObjects = (): PDTObject[] => this.children[0].children as PDTObject[];

    public getLength = (): number => this.length;

    public updateObjects = (fun: Function): void => {
        this.objects.forEach((obj) => fun(obj));
    };

    public tick = (time: number) => {
        this.updateObjects(tick(time));
    };
}
