/**
 * Implementation of objects inside PDTs.
 *
 * @module object.model
 */
import { Group } from "three";

import {
    Location,
    type LocationJSON,
    Class,
    type ClassJSON,
    Rotation,
    type RotationJSON,
    Material,
    type MaterialJSON,
} from "@/models/Properties";
import type { PDT } from "./pdt.model";

/**
 * PDT object data type, following the backend API data format.
 */
export type ObjectJSON = {
    id: number;
    class: ClassJSON[];
    location: LocationJSON[];
    rotation: RotationJSON[];
    material: MaterialJSON[];
    scale: (number | undefined)[];
    physics?: boolean[];
};

/**
 * Implements representation of objects in PDT, including class, material, location, rotation etc.
 */
export class PDTObject extends Group {
    /** Object which has this location. */
    declare parent: PDT;
    /** Object ID */
    readonly objID: number;

    /** Object class. @remark `this.class = this.children[0]`. */
    readonly class: Class;
    /** Object material. Used to create class representation. */
    readonly material: Material;

    /**
     * Creates a PDT object from JSON data.
     *
     * @param objJSON Object data, from backend API.
     */
    constructor(parent: PDT, objJSON: ObjectJSON) {
        super();
        this.parent = parent;
        this.objID = objJSON.id;
        this.userData.type = "Object";

        // get material from JSON data
        this.material = new Material(objJSON.material);

        // get class from JSON data and add representation to PDTObject
        this.class = new Class(this, objJSON.class, this.material, objJSON.scale);
        this.add(this.class);

        // setup location from JSON data
        const location = new Location(this, objJSON.location);
        this.add(location);

        // setup rotation from JSON data
        const rotation = new Rotation(this, objJSON.rotation);
        this.add(rotation);
    }

    /**
     * Returns current object time index.
     *
     * @returns Object time index.
     */
    public getTimeIndex = (): number => Math.trunc(this.parent.getTimeIndex());

    /**
     * Returns object location.
     *
     * @returns Object location.
     */
    public getLocation = (): Location => this.children[1] as Location;

    /**
     * Update object to the given time.
     *
     * @param time Time when update object.
     */
    public tick(time?: number): void {
        const PDTTimeIndex = this.parent.getTimeIndex();
        // update class representation
        this.class.update(time ?? PDTTimeIndex);

        // update object position
        (this.children[1] as Location).update(time);

        // update object rotation
        (this.children[2] as Rotation).update(time ?? PDTTimeIndex);
    }
}
