import { Group, Vector3, type MeshStandardMaterial, type Intersection } from "three";

import { Location, type LocationJSON } from "@/models/location.model";
import { Class, type ClassJSON } from "@/models/class.model";
import type { RotationJSON } from "@/models/rotation.model";
import { Material, type MaterialJSON } from "@/models/material.model";

export type ObjectJSON = {
    id: number;
    class: ClassJSON[];
    location: LocationJSON[];
    rotation?: RotationJSON[];
    material: MaterialJSON[];
    scale: (number | undefined)[];
    physics?: boolean[];
};

export type ModelFile = {
    name: string;
    content: string;
};

export class PDTObject extends Group {
    objID: number;
    class!: Class;
    material!: Material;
    private timeLength: number;
    private timeIndex: number;
    private beginPosition: Vector3;
    private endPosition: Vector3;
    private direction!: Vector3;

    constructor(objJSON: ObjectJSON, models?: Group[], materials?: MeshStandardMaterial[]) {
        super();
        this.objID = objJSON.id;
        this.userData.type = "Object";

        this.timeIndex = 0;
        this.timeLength = objJSON.location.length;

        this.material = new Material(objJSON.material, materials);

        this.class = new Class(this, objJSON.class, this.material, objJSON.scale, models);
        this.add(this.class);

        const location = new Location(this, objJSON.location);
        this.add(location);

        this.beginPosition = new Vector3();
        this.endPosition = new Vector3();
        this.getWorldPosition(this.beginPosition);
        this.getWorldPosition(this.endPosition);
        this.setDirection(this.timeIndex);
    }

    public toggleVisibility(showObject: boolean = true) {
        this.children[0].visible = showObject;
    }

    public toggleLocation(showLocation: boolean = false) {
        this.children[1].visible = showLocation;
    }

    private setDirection(time: number) {
        const loc = this.children[1] as Location;

        this.beginPosition = this.endPosition;
        this.endPosition = loc.getPosition(time + 1);

        this.direction = new Vector3(...this.endPosition.toArray()).sub(this.beginPosition);
        this.timeIndex = Math.trunc(time);
    }

    public tick(time: number) {
        time = time % this.timeLength;

        const delta = time - Math.trunc(time);
        if (Math.abs(Math.trunc(time) - this.timeIndex) >= 1) {
            // update class representation
            this.class.update(time);

            // set new direction
            this.setDirection(time);
        }

        // update object position
        let actualPosition = new Vector3();
        this.children[0].getWorldPosition(actualPosition);

        const ratioVector = new Vector3().copy(this.direction).multiplyScalar(delta);
        const axis = new Vector3(...this.beginPosition.toArray())
            .sub(actualPosition)
            .add(ratioVector);
        const norm = axis.length();

        this.children[0].translateOnAxis(axis.normalize(), norm);
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

export const PDTObjServices = {
    toggleLocation,
    toggleObjects,
    getObjectFromIntersect,
};
