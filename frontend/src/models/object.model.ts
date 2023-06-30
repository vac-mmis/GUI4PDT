import type { LocationJSON } from "@/models/location.model";
import { Class, type ClassJSON } from "@/models/class.model";
import type { RotationJSON } from "@/models/rotation.model";
import type { MaterialJSON } from "@/models/material.model";
import type { DistLocation } from "@/services/dist.services";
import { getMean } from "@/services/dist.services";
import { Group } from "three";
import { emptyObject, createObject } from "@/World/components/object";

export type ObjectJSON = {
    id: number;
    class: ClassJSON;
    location: LocationJSON;
    rotation?: RotationJSON;
    material: MaterialJSON;
    scale?: number;
    physics?: boolean;
};

export function typeToObject(
    models: Group[],
    position: [number, number, number],
    type: ClassJSON
): Group {
    // create a geometry
    const group = new Group();
    if (typeof type === "string") {
        const model = models.find((model) => model.name === type);
        if (model !== undefined) {
            const object = createObject(model, position);
            group.add(object);
        }
    } else {
        const dist = type.dist;
        const res = Object.entries(dist.mass)
            .map((type: [string, number]) => {
                const model = models.find((m) => m.name === type[0]);
                if (model === undefined) {
                    return undefined;
                } else {
                    return createObject(model, position, type[1]);
                }
            })
            .filter((model): model is Group => model !== undefined);
        group.add(...res);
    }
    return group;
}

export class PDTObject {
    id: number;
    obj!: Group;
    type!: Class;
    //location!: Location;
    rotation?: any;
    material?: any;

    constructor(obj: ObjectJSON | number, models?: Group[]) {
        if (typeof obj === "number") {
            this.id = obj;
            return;
        } else {
            this.id = obj.id;
        }

        let position: [number, number, number];
        if ("dist" in obj.location) {
            position = getMean(obj.location.dist as DistLocation);
        } else {
            position = obj.location;
        }

        this.obj = models ? typeToObject(models, position, obj.class) : emptyObject(position);
        this.type = new Class(this.id, obj.class);

        //this.location = new Location(this.id, models[0], obj.location);
    }

    static copy(object: PDTObject): PDTObject {
        const copyObj = new PDTObject(object.id);
        copyObj.id = object.id;
        copyObj.obj = object.obj.clone();
        copyObj.type = Class.copy(object.type);
        //copyObj.location = Location.copy(object.location);
        copyObj.rotation = object.rotation ? { ...object.rotation } : undefined;
        copyObj.material = object.material ? { ...object.material } : undefined;
        return copyObj;
    }
}
