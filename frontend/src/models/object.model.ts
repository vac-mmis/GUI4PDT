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
import type { LocationVisibility } from "@/models/Properties/Location";
import type { ClassVisibility } from "@/models/Properties/Class";

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
    /** Object ID */
    objID: number;
    /** Current time index to show. */
    private time: number;
    /** Number of timestamps of the object.  */
    private timeLength: number;
    /** Object class. @remark `this.class = this.children[0]`. */
    class: Class;
    /** Object material. Used to create class representation. */
    material: Material;

    /**
     * Creates a PDT object from JSON data.
     *
     * @param objJSON Object data, from backend API.
     */
    constructor(objJSON: ObjectJSON) {
        super();
        this.objID = objJSON.id;
        this.time = 0;
        this.timeLength = objJSON.class.length;
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
    public getTimeIndex = (): number => Math.trunc(this.time);

    /**
     * Returns object class.
     *
     * @returns Object classes.
     */
    public getObject = (): Class => this.children[0] as Class;

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
    public tick(time: number): void {
        time %= this.timeLength;
        // update class representation
        this.class.update(time);

        // update object position
        (this.children[1] as Location).update(time);

        // update object rotation
        (this.children[2] as Rotation).update(time);

        this.time = time;
    }
}

/**
 * Give function to set visibility of an object list.
 *
 * @param showObject Desired visibility to set.
 *
 * @returns Function which set given visibility to object list.
 */
export function toggleObjects(showObject: ClassVisibility): (obj: PDTObject) => void {
    return (obj: PDTObject) => {
        obj.getObject().getController().set(showObject);
    };
}

/**
 * Give function to set location visibility of an object list.
 *
 * @param showObject Desired location visibility to set.
 *
 * @returns Function which set given location visibility to object list.
 */
export function toggleLocation(showLocation: LocationVisibility): (obj: PDTObject) => void {
    return (obj: PDTObject) => obj.getLocation().getController().set(showLocation);
}

/**
 * Give function to tick objects in object list.
 *
 * @param time Desired time to update objects.
 *
 * @returns Function which updates objects in object list at given time.
 */
export function tickObjects(time: number): (obj: PDTObject) => void {
    return (obj: PDTObject) => obj.tick(time);
}
