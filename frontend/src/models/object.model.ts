/**
 * Implementation of objects inside PDTs.
 *
 * @module PDT.Object
 */
import { Group } from "three";

import { Location, Class, Rotation, Material } from "@/models/Properties";
import type { ObjectJSON } from "@/interfaces/pdt";
import type { PDT } from "./pdt.model";
import type { Controller } from "./Controls/Controller";

/**
 * Implements representation of objects in PDT, including class, material, location, rotation etc.
 */
export class PDTObject extends Group {
    /** Object which has this location. */
    declare parent: PDT;
    /** Object ID */
    readonly objID: number;
    /** Current time index to show. */
    private time: number = 0;

    /** Object class. @remark `this.class = this.children[0]`. */
    readonly class: Class;
    /** Object material. Used to create class representation. */
    readonly material: Material;
    /** Object location. @remark `this._location = this.children[1]`. */
    private _location: Location;
    /** Object rotation. @remark `this._rotation = this.children[2]`. */
    private _rotation: Rotation;

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
        this._location = new Location(this, objJSON.location);
        this.add(this._location);

        // setup rotation from JSON data
        this._rotation = new Rotation(this, objJSON.rotation);
        this.add(this._rotation);
    }

    /**
     * Returns current object time index.
     *
     * @returns Object time index.
     */
    public getTimeIndex = (): number => Math.trunc(this.time);

    public getControllers = (): Controller<any>[] => [
        this.class.getController(),
        this._location.getController(),
        this._rotation.getController(),
    ];
    /**
     * Update object to the given time.
     *
     * @param time Time when update object.
     */
    public tick(time?: number): void {
        // update class representation
        this.class.update(time ?? this.time);

        // update object position
        (this.children[1] as Location).update(time);

        // update object rotation
        (this.children[2] as Rotation).update(time);

        if (time) {
            this.time = time;
        }
    }
}
