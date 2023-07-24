import { Group, type Intersection } from "three";

import { Location, type LocationJSON } from "@/models/location.model";
import { Class, type ClassJSON } from "@/models/class.model";
import { Rotation, type RotationJSON } from "@/models/rotation.model";
import { Material, type MaterialJSON } from "@/models/material.model";

export type ObjectJSON = {
    id: number;
    class: ClassJSON[];
    location: LocationJSON[];
    rotation: RotationJSON[];
    material: MaterialJSON[];
    scale: (number | undefined)[];
    physics?: boolean[];
};

export class PDTObject extends Group {
    objID: number;
    class!: Class;
    material!: Material;

    constructor(objJSON: ObjectJSON) {
        super();
        this.objID = objJSON.id;
        this.userData.type = "Object";

        // get material from JSON data
        this.material = new Material(objJSON.material);

        // get class from JSON data and add representation to PDTObject
        this.class = new Class(this, objJSON.class, this.material, objJSON.scale);
        this.add(this.class);

        // setup rotation from JSON data
        const rotation = new Rotation(this, objJSON.rotation);

        // setup location from JSON data
        const location = new Location(this, objJSON.location);
        this.add(location);

        this.add(rotation);
    }

    public getObject = (): Class => this.children[0] as Class;

    public getLocation = () => this.children[1];

    public getObjectVisibility = () => this.children[0].visible;

    public setObjectVisibility(showObject: boolean = true) {
        this.children[0].visible = showObject;
    }

    public getLocationVisibility = () => this.children[1].visible;

    public setLocationVisibility(showLocation: boolean = false) {
        this.children[1].visible = showLocation;
    }

    public tick(time: number) {
        // update class representation
        this.class.update(time);

        // update object position
        (this.children[1] as Location).updatePosition(time);

        // update object rotation
        (this.children[2] as Rotation).updateRotation(time);
    }
}

const toggleObjects = (showObject: boolean) => {
    return (obj: PDTObject) => {
        obj.setObjectVisibility(showObject);
    };
};

const toggleLocation = (showLocation: boolean) => {
    return (obj: PDTObject) => obj.setLocationVisibility(showLocation);
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
