import { Location, type LocationJSON } from "@/models/location.model";
import { Class, type ClassJSON } from "@/models/class.model";
import type { RotationJSON } from "@/models/rotation.model";
import type { MaterialJSON } from "@/models/material.model";
import type { MultivariateNormal, UniformContinuous } from "@/services/dist.services";
import { getMean } from "@/services/dist.services";
import { Group, type Intersection } from "three";
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
    type: ClassJSON,
    scale: number = 1
): Group {
    // create a geometry
    const group = new Group();
    if (typeof type === "string") {
        const model = models.find((model) => model.name === type);
        if (model !== undefined) {
            const object = createObject(model, position, scale, 1);
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
                    return createObject(model, position, scale, type[1]);
                }
            })
            .filter((model): model is Group => model !== undefined);
        group.add(...res);
    }
    return group;
}

export class PDTObject extends Group {
    objID: number;
    class!: Class;
    //material?: any;

    constructor(objJSON: ObjectJSON, models?: Group[]) {
        super();
        //
        this.objID = objJSON.id;
        this.userData.type = "Object";

        if ("dist" in objJSON.location) {
            const mean = getMean(
                objJSON.location.dist as MultivariateNormal | UniformContinuous
            ).slice(0, 3);
            this.position.set(...(mean as [number, number, number]));
        } else {
            this.position.set(...objJSON.location);
        }

        const object = models
            ? typeToObject(models, [0, 0, 0], objJSON.class, objJSON.scale)
            : emptyObject([0, 0, 0]);
        this.add(object);

        const location = new Location(this.objID, objJSON.location);
        this.add(location);

        this.class = new Class(this.id, objJSON.class);
    }

    public toggleVisibility(showObject: boolean = true) {
        this.children[0].visible = showObject;
    }

    public toggleLocation(showLocation: boolean = false) {
        this.children[1].visible = showLocation;
    }

    public tick(time: number, delta: number = 1) {
        const loc = this.children[1] as Location;
        const newLocation = loc.getPosition(time);

        newLocation.sub(this.children[0].position);
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
