/**
 * Implementation of object location (where object could be is in space).
 *
 * @module object.location
 */

import { Group, Vector3 } from "three";

import { type Distribution, makeDistribution } from "@/models/Distributions";
import { type Representation, makeRepresentation } from "@/models/Representations";
import type { PDTObject } from "@/models/object.model";

/**
 * Location data type, following the backend API data format.
 */
export type LocationJSON = { dist: Distribution } | [number, number, number];

/**
 * Associates used distributions to their representations
 */
const distToRep = {
    "multivariate-normal": "scatter3D",
    "uniform-continuous": "box",
} as Record<string, string>;

/**
 * Implements representation of object position in PDT.
 *
 * @remark Object location is the distribution of where the object could be. This distribution is represented as points cloud which color follows location distribution.
 */
export class Location extends Group {
    /** Object which has this location. */
    declare parent: PDTObject;

    /** Location distribution through time. */
    private dist: (Distribution | [number, number, number])[];

    /** Current direction of object*/
    private direction!: Vector3;
    /** Begin position of current direction */
    private beginPosition: Vector3;
    /** End position of current direction */
    private endPosition: Vector3;

    /**
     * Creates object location representation.
     *
     * @param parent Object which has this class.
     * @param locJSON Object location data through time.
     */
    constructor(parent: PDTObject, locJSON: LocationJSON[]) {
        super();
        this.parent = parent;
        this.userData.type = "Location";
        this.visible = false;
        this.dist = [];

        // get distributions from JSON data
        locJSON.forEach((timestamp, i) => {
            if (!("dist" in timestamp)) {
                this.dist.push(timestamp);
                if (i === 0) {
                    this.parent.position.set(...timestamp);
                    this.add(makeRepresentation("box", [0.2, 0.2, 0.2]));
                }
            } else {
                const dist = makeDistribution(timestamp.dist);
                this.dist.push(dist);
                if (i === 0) {
                    this.parent?.position.set(...(dist.getMean() as [number, number, number]));
                    this.add(makeRepresentation(distToRep[dist.type], dist.representation(true)));
                }
            }
        });

        // initialize position
        this.beginPosition = new Vector3();
        this.endPosition = new Vector3();
        this.getWorldPosition(this.beginPosition);
        this.getWorldPosition(this.endPosition);

        // set initial position
        this.updateDirection(this.parent.getTimeIndex());
    }

    /**
     * Give a possible object position in PDT at desired time.
     *
     * @param t Time of desired position.
     * @param relative If `true`, give position relatively to the mean (default : `false`).
     *
     * @returns Possible object position at given time.
     * */
    private getPosition(t: number, relative: boolean = false): Vector3 {
        const index = t < this.dist.length ? Math.trunc(t) : this.dist.length - 1;
        const dist = this.dist[index];
        if ("type" in dist) {
            (this.children[0] as Representation).update(dist.representation(true));
            return new Vector3(...dist.random(relative));
        } else {
            return new Vector3(...dist);
        }
    }

    /**
     * Update object direction between `trunc(time)` and `trunc(time)+1`.
     *
     * @param time Time to update direction.
     */
    private updateDirection(time: number): void {
        this.beginPosition = this.endPosition;
        this.endPosition = this.getPosition((time + 1) % this.dist.length);

        this.direction = this.endPosition.clone().sub(this.beginPosition);
    }

    /**
     * Update object location to one of the possible position at desired time.
     *
     * @param time Time to update position.
     */
    public update(time: number): void {
        const index = Math.trunc(time);

        // set new direction if needed
        if (Math.abs(index - Math.trunc(this.parent.getTimeIndex())) >= 1) {
            this.updateDirection(time);
        }

        // update object position
        const object = this.parent.getObject();
        const actualPosition = new Vector3();
        object.getWorldPosition(actualPosition);

        const delta = time - index;
        const ratioVector = this.direction.clone().multiplyScalar(delta);
        const axis = this.beginPosition.clone().sub(actualPosition).add(ratioVector);
        const norm = axis.length();

        object.translateOnAxis(axis.normalize(), norm);
    }
}
