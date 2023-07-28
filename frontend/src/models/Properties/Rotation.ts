/**
 * Implementation of object location (where object could be is in space).
 *
 * @module object.rotation
 */

import { Euler, Group, Vector3 } from "three";

import { type Distribution, makeDistribution } from "@/models/Distributions";
import type { PDTObject } from "@/models/object.model";

/** Angle units used in JSON files */
const ANGLE_UNIT = "deg" as const;

/**
 * Location data type, following the backend API data format.
 */
export type RotationJSON = { dist: Distribution } | [number, number, number];

/**
 * Implements representation of object rotation.
 *
 * @remark Object rotation is the distribution of how it is self-orientated. This distribution is represented through variations of orientation through time.
 * @remark Rotation vectors are sometimes represented in `Vector3` and not `Euler` vectors to allow basic operations (sub, add...).
 */
export class Rotation extends Group {
    /** Object which has this rotation. */
    declare parent: PDTObject;

    /** Rotation distribution through time. */
    private dist: (Distribution | [number, number, number])[];

    /** Begin rotation of current direction */
    private beginRotation: Vector3;
    /** End rotation of current direction */
    private endRotation: Vector3;
    /** Current rotation delta of object*/
    private rotationDelta: Vector3;

    /**
     * Creates object location representation.
     * @param parent : Object which has this rotation.
     * @param rotJSON : Object rotation data through time.
     */
    constructor(parent: PDTObject, rotJSON: RotationJSON[]) {
        super();
        this.parent = parent;
        this.userData.type = "Location";
        this.visible = false;
        this.dist = [];

        // get distributions from JSON data
        const object = this.parent.getObject();
        rotJSON.forEach((timestamp) => {
            if (!("dist" in timestamp)) {
                this.dist.push(timestamp);
            } else {
                this.dist.push(makeDistribution(timestamp.dist, ANGLE_UNIT));
            }
        });

        // initialize rotation
        this.beginRotation = new Vector3();
        this.endRotation = this.getRotation(this.parent.getTimeIndex());
        this.rotationDelta = new Vector3();
        this.updateDirection(this.parent.getTimeIndex());

        // set initial rotation
        object.setRotation(new Euler().setFromVector3(this.beginRotation));
    }

    /**
     * Give a possible object rotation at desired time.
     *
     * @param t Time of desired rotation
     * @param relative If `true`, give rotation relatively to the mean (default : `false`).
     *
     * @returns Possible object rotation at given time.
     */
    private getRotation(t: number, relative: boolean = false): Vector3 {
        const index = t < this.dist.length ? Math.trunc(t) : this.dist.length - 1;
        const dist = this.dist[index];
        if ("type" in dist) {
            return new Vector3(...dist.random(relative));
        } else {
            return new Vector3(...dist);
        }
    }

    /**
     * Update object rotation delta between `trunc(time)` and `trunc(time)+1`.
     *
     * @param time Time to update rotation delta.
     */
    private updateDirection(time: number) {
        this.beginRotation = this.endRotation;
        this.endRotation = this.getRotation((time + 1) % this.dist.length);

        const beginRotArray: [number, number, number] = this.beginRotation.toArray();
        const endRotArray: [number, number, number] = this.endRotation.toArray();
        const rotDeltaArray = endRotArray.map((e: number, i) => {
            const diff = e - beginRotArray[i];
            const mod = ((Math.abs(diff) + Math.PI) % (2 * Math.PI)) - Math.PI;
            return diff < 0 ? -mod : mod;
        });
        this.rotationDelta.set(...(rotDeltaArray as [number, number, number]));
    }

    /**
     * Update object rotation to one of the possible rotation at desired time.
     *
     * @param time Time to update rotation.
     */
    public update(time: number): void {
        const index = Math.trunc(time);

        // set new direction if needed
        if (Math.abs(index - this.parent.getTimeIndex()) >= 1) {
            this.updateDirection(time);
        }

        // update object rotation
        const object = this.parent.getObject();

        const delta = time - index;
        const ratioVector = this.rotationDelta.clone().multiplyScalar(delta);
        const euler = new Euler().setFromVector3(this.beginRotation.clone().add(ratioVector));

        object.setRotation(euler);
    }
}
