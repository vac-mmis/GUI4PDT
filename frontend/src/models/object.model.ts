import { Location, type LocationJSON } from "@/models/location.model";
import { Class, type ClassJSON } from "@/models/class.model";
import type { RotationJSON } from "@/models/rotation.model";
import type { MaterialJSON } from "@/models/material.model";
import type { MultivariateNormal, UniformContinuous } from "@/services/dist.services";
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
    //location!: Location;
    material?: any;

    constructor(objJSON: ObjectJSON, models?: Group[]) {
        super();
        //
        this.objID = objJSON.id;

        let position: [number, number, number];
        if ("dist" in objJSON.location) {
            position = getMean(objJSON.location.dist as MultivariateNormal | UniformContinuous);
        } else {
            position = objJSON.location;
        }

        const object = models
            ? typeToObject(models, position, objJSON.class, objJSON.scale)
            : emptyObject(position);
        this.add(object);

        const location = new Location(this.objID, objJSON.location);
        this.add(location);

        this.class = new Class(this.id, objJSON.class);

        //this.location = new Location(this.id, models[0], obj.location);
    }
}
