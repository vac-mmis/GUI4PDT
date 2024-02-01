/**
 * Implementation of objects inside PDTs.
 *
 * @module PDT.Object
 */
import { Group } from "three";

import { Location, Class, Rotation, Material } from "@/models/Properties";
import type { ObjectJSON } from "@/interfaces/pdt";
import type { PDT } from "@/models/pdt.model";
import type { Controller } from "@/models/Controls/Controller";
import type { ObjectDetails } from "./Controls/ObjectDetails";

/**
 * Implements representation of objects in PDT, including class, material, location, rotation etc.
 */
export class PDTObject extends Group {
    /** Object which has this location. */
    declare parent: PDT;
    /** Object ID */
    readonly objID: string;
    /** Current time index to show. */
    private time: number = 0;

    /** Object name. */
    private objName: string;

    /** Object class. @remark `this.class = this.children[0]`. */
    readonly class: Class;
    /** Object material. Used to create class representation. */
    readonly material: Material;
    /** Object location. @remark `this._location = this.children[1]`. */
    private _location: Location;
    /** Object rotation. @remark `this._rotation = this.children[2]`. */
    private _rotation: Rotation;
    
    
    dist: any;

    /**
     * Creates a PDT object from JSON data.
     *
     * @param objJSON Object data, from backend API.
     */
    constructor(parent: PDT, objID: string, objJSON: ObjectJSON) {
        super();
        this.parent = parent;
        this.objID = objID;
        this.objName = objJSON.name;
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
     * Returns object properties details (description, 2D graph...).
     * 
     * Add new property details by adding new entries to the returned object.
     * 
     * @param t Desired time to gat details.
     *
     * @returns Object properties details.
     */
    public getDetails(t: number): Record<string, ObjectDetails> {
        t = Math.trunc(t) % this._location.dist.length;

     

        return {
            // name: {
            //     description: this._location.dist[t].toString(),
            //     representation: undefined,
            // },
            location: {
                description: this._location.dist[t].toString(),
                representation: undefined,
            },
            rotation: {
                description: this._rotation.dist[t].toString(),
                representation: undefined,
            },
            class: {
                description: this.class.dist[t].toString(),
                representation: this.class.representation(t),
            },
            material: {
                description: this.material.dist[t].toString(),
                representation: this.material.representation(t),
            },
            scale: {
                description: this.class.getScaleFactor()[t].toString(),
                representation: undefined,
            },

        };
    }

    /**
     * Update object to the given time.
     *
     * @param time Time when update object.
     */
    public tick(time?: number): void {
        // update class representation
        this.class.update(time);

        // update object position
        this._location.update(time);

        // update object rotation
        this._rotation.update(time);

        if (time) {
            this.time = time;
        }
    }
}
