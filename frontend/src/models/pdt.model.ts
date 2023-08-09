/**
 * Implementation of Probabilistic Digital-Twins (PDT)
 *
 * @module PDT.model
 */

import { Group, Object3D, type Intersection } from "three";
import { PDTObject, type ObjectJSON, tickObjects } from "@/models/object.model";
import { ElevationMap } from "@/models/elevation.model";

/**
 * PDT data type, following the backend API data format.
 */
export interface PDTJSON {
    name: string;
    objects: ObjectJSON[];
    elevationMap?: [number, number, number, number][];
}

/**
 * Implements PDT representation, including objects and global data.
 */
export class PDT extends Group {
    /** PDT name */
    name: string;
    /** Number of timestamps of the object.  */
    private timeLength: number;
    /** Objects inside PDT. */
    private objects: PDTObject[];
    /** Elevation map of the sea in PDT. */
    private elevationMap?: ElevationMap;

    /**
     * Creates a PDT object from JSON data.
     *
     * @param pdt PDT data, from backend API.
     */
    constructor(pdt: PDTJSON) {
        super();
        this.name = pdt.name;
        this.userData.type = "PDT";
        this.timeLength = pdt.objects[0].location.length;

        // Add objects as new children group
        this.objects = pdt.objects.map((obj: ObjectJSON) => new PDTObject(obj));
        this.add(new Group().add(...this.objects));

        // Add elevation map as new children
        if (pdt.elevationMap) {
            this.elevationMap = new ElevationMap(pdt.elevationMap);
            this.add(this.elevationMap);
        }
    }

    /**
     * Returns PDT objects or global representation which action on hover is desired.
     *
     * @returns Hoverable objects if defined.
     */
    public getHoverables = (): Object3D[] | undefined => undefined;

    /**
     * Returns PDT objects or global representation which action on click is desired.
     *
     * @returns Clickable objects if defined.
     */
    public getClickables = (): Object3D[] => this.objects;

    /**
     * @returns PDT objects.
     */
    public getObjects = (): PDTObject[] => this.objects;

    /**
     * @returns PDT Elevation map.
     */
    public getElevationMap = (): ElevationMap | undefined => this.elevationMap;

    /**
     * @returns Number of timestamps.
     */
    public getTimeLength = (): number => this.timeLength;

    /**
     * UApply given function on all PDT objects
     *
     * @param fun Function to apply on all objects in PDT.
     */
    public updateObjects = (fun: Function): void => {
        this.objects.forEach((obj) => fun(obj));
    };

    /**
     * Get object intersected by Three.JS raycaster on hover.
     *
     * @param intersect Intersection result from World Pointer.
     *
     * @returns Intersected object.
     */
    public onHover(intersect: Intersection<Object3D>): PDTObject | undefined {
        if (intersect) {
            return undefined;
        }
        return undefined;
    }

    /**
     * Get object intersected by Three.JS raycaster on click.
     *
     * @param intersect Intersection result from World Pointer.
     *
     * @returns Intersected object.
     */
    public onClick(intersect: Intersection): PDTObject | undefined {
        let object = intersect.object;
        while (object.parent && object.userData.type !== "Object") {
            object = object.parent;
        }
        if (object.type === "Scene") {
            throw new Error("Object not found, Scene reached");
        }
        return object as PDTObject;
    }

    /**
     * Update PDT to desired timestamp.
     *
     * @param time Desired timestamp.
     */
    public tick = (time: number) => {
        this.updateObjects(tickObjects(time));
    };
}
