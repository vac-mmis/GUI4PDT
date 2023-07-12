import { Group, MeshStandardMaterial, type Intersection, Vector3 } from "three";

import { Location, type LocationJSON } from "@/models/location.model";
import { Class, type ClassJSON } from "@/models/class.model";
import type { RotationJSON } from "@/models/rotation.model";
import { Material, type MaterialJSON } from "@/models/material.model";

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

export type ModelFile = {
    name: string;
    content: string;
};

const typeToObject = (
    models: Group[],
    materials: MeshStandardMaterial[],
    position: [number, number, number],
    type: Class,
    materialDist: Material,
    scale: number = 1
): Group => {
    // create a geometry
    const group = new Group();
    const res = Object.entries(type.getMass())
        .map((type: [string, number]) => {
            const model = models.find((m) => m.name === type[0]);
            const material = materialDist.getMaterial(materials);
            if (model === undefined) {
                return undefined;
            } else {
                return createObject(model, material, position, scale, type[1]);
            }
        })
        .filter((model): model is Group => model !== undefined);
    group.add(...res);
    return group;
};

export class PDTObject extends Group {
    objID: number;
    class!: Class;
    material!: Material;
    private timeIndex: number;
    private nextPosition: Vector3;

    constructor(objJSON: ObjectJSON, models?: Group[], materials?: MeshStandardMaterial[]) {
        super();
        this.objID = objJSON.id;
        this.userData.type = "Object";
        this.timeIndex = 0;
        this.nextPosition = new Vector3(0, 0, 0);

        const location = new Location(this, objJSON.location);
        if (!materials) {
            materials = [new MeshStandardMaterial()];
        }

        this.class = new Class(objJSON.class);
        this.material = new Material(objJSON.material);

        const object = models
            ? typeToObject(models, materials, [0, 0, 0], this.class, this.material, objJSON.scale)
            : emptyObject([0, 0, 0]);

        this.add(object);
        this.add(location);
    }

    public toggleVisibility(showObject: boolean = true) {
        this.children[0].visible = showObject;
    }

    public toggleLocation(showLocation: boolean = false) {
        this.children[1].visible = showLocation;
    }

    public tick(time: number, delta: number = 1) {
        const loc = this.children[1] as Location;
        if (Math.abs(Math.trunc(time) - this.timeIndex) >= 1) {
            this.nextPosition = loc.getPosition(time);
            this.timeIndex = Math.trunc(time);
        }

        const newLocation = new Vector3(...this.nextPosition.toArray()).sub(
            this.children[0].position
        );
        const norm = newLocation.length();
        this.children[0].translateOnAxis(newLocation.normalize(), delta * norm);
    }
}

const toggleObjects = (showObject: boolean) => {
    return (obj: PDTObject) => {
        obj.toggleVisibility(showObject);
    };
};

const toggleLocation = (showLocation: boolean) => {
    return (obj: PDTObject) => obj.toggleLocation(showLocation);
};

const getObjectFromIntersect = (intersect: Intersection): PDTObject => {
    let object = intersect.object;
    while (object.parent && object.userData.type !== "Object") {
        object = object.parent;
    }
    if (object.type === "Scene") {
        throw new Error("Object not found, Scene reached");
    }
    return object as PDTObject;
};

export const ObjServices = {
    toggleLocation,
    toggleObjects,
    getObjectFromIntersect,
};
