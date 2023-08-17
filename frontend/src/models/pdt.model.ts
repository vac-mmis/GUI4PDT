/**
 * Implementation of Probabilistic Digital-Twins (PDT)
 *
 * @module PDT.model
 */

import { Group, Object3D, type Intersection, MeshStandardMaterial } from "three";
import { PDTObject, type ObjectJSON } from "@/models/object.model";
import { Map } from "@/models/map.model";
import type { WorldContent } from "@/World/interface";

import materialStore from "@/store/material.store";

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
export class PDT extends Group implements WorldContent {
    /** PDT name */
    name: string;

    /** Current time index to show. */
    private time: number = 0;
    /** Number of timestamps of the object.  */
    private timeLength: number;

    /** Objects inside PDT. */
    readonly objects: PDTObject[];
    /** Elevation map of the sea in PDT. */
    private elevationMap?: Map;

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
        this.objects = pdt.objects.map((obj: ObjectJSON) => new PDTObject(this, obj));
        this.add(new Group().add(...this.objects));

        // Add elevation map as new children
        if (pdt.elevationMap) {
            const { find }: { find: (name: string) => MeshStandardMaterial | undefined } =
                materialStore();
            const mapMaterial = find("water");
            if (mapMaterial) {
                mapMaterial.opacity = 0.7;
                mapMaterial.transparent = true;
            }
            this.elevationMap = new Map(pdt.elevationMap, mapMaterial);
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
    public getClickables = (): Object3D[] | undefined => this.objects;

    /**
     * Returns PDT current time index.
     *
     * @returns PDT time index.
     */
    public getTimeIndex = (): number => Math.trunc(this.time);

    /**
     * @returns PDT objects.
     */
    public getObjects = (): PDTObject[] => this.objects;

    /**
     * @returns PDT Elevation map.
     */
    public getElevationMap = (): Map | undefined => this.elevationMap;

    /**
     * @returns Number of timestamps.
     */
    public getTimeLength = (): number => this.timeLength;

    /**
     * Apply given function on all PDT objects
     *
     * @param fun Function to apply on all objects in PDT.
     */
    private updateObjects = (fun: Function): void => {
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
    public onClick(intersect: Intersection): Object3D | undefined {
        let object = intersect.object;
        while (object.parent && object.userData.type !== "Object") {
            object = object.parent;
        }
        if (object.type === "Scene") {
            throw new Error("Object not found, Scene reached");
        }
        return object;
    }

    /**
     * Update PDT to desired timestamp.
     *
     * @param time Desired timestamp.
     */
    public tick = (time?: number) => {
        if (time) {
            time %= this.timeLength;
        }
        this.updateObjects((obj: PDTObject) => obj.tick(time));
        if (time) {
            this.time = time;
        }
    };
}
