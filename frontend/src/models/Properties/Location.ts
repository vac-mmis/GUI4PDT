/**
 * Implementation of object location (where object could be is in space).
 *
 * @module Object.Location
 */

import { Group, Vector3 } from "three";

import { Controller } from "@/models/Controls/Controller";
import type { LocationJSON } from "@/interfaces/properties";
import { type Distribution, makeDistribution } from "@/models/Distributions";
import { type Representation, makeRepresentation } from "@/models/Representations";
import type { PDTObject } from "@/models/object.model";

/**
 * Associates used distributions to their representations
 */
const distToRep = {
    "multivariate-normal": "scatter3D",
    "uniform-continuous": "box",
} as Record<string, string>;

const LocationVisibilities = ["plot", "move"] as const;
type LocationVisibility = (typeof LocationVisibilities)[number];

/**
 * Implements representation of object position in PDT.
 *
 * @remark Object location is the distribution of where the object could be. This distribution is represented as points cloud which color follows location distribution.
 */
export class Location extends Group {
    /** Object which has this location. */
    declare parent: PDTObject;

    /** Location distribution through time. */
    readonly dist: (Distribution | [number, number, number])[] = [];

    /** Location distribution through time. */
    public distAsPoints: Representation[] = [];

    /** Current direction of object*/
    private direction: Vector3 = new Vector3();
    /** Begin position of current direction */
    private beginPosition: Vector3 = new Vector3();
    /** End position of current direction */
    private endPosition: Vector3 = new Vector3();
    /** Proportion of direction to follow */
    private delta = 1;

    /** `true` if location is shows as probabilistic */
    private visibility: LocationVisibility[] = [];
    /** Location controller module  */
    private controller: Controller<LocationVisibility>;

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
                    this.parent?.position.set(...(dist.getMode() as [number, number, number]));
                    this.add(makeRepresentation(distToRep[dist.type], dist.representation(true)));
                }
            }
        });

        // initialize position
        this.getWorldPosition(this.beginPosition);
        this.getWorldPosition(this.endPosition);

        // set initial position
        this.updateDirection(this.parent.getTimeIndex());

        // init controller
        this.controller = new Controller<LocationVisibility>(
            "loc",
            LocationVisibilities,
            "Location",
            () => this.getVisibility(),
            (visibility) => this.setVisibility(visibility)
        );
    }

    /**
     * Get actual location visibility
     *
     * @returns Location visibility
     */
    private getVisibility = (): LocationVisibility[] => this.visibility;

    /**
     * Set location visibility
     *
     * @param visibility Desired location visibility
     */
    private setVisibility(visibility: LocationVisibility[]) {
        this.visibility = visibility;
        this.visible = visibility.includes("plot");
    }

    /**
     * Give location controller to toggle its visibility
     *
     * @returns Location controller
     */
    public getController = (): Controller<LocationVisibility> => this.controller;

    /**
     * Give a possible object position in PDT at desired time.
     *
     * @param t Time of desired position.
     * @param relative If `true`, give position relatively to the mean (default : `false`).
     *
     * @returns Possible object position at given time.
     * */
    private getPosition(t: number, relative: boolean = false): Vector3 {
        const index = t < this.dist.length - 1 ? Math.trunc(t) : this.dist.length - 1;
        const dist = this.dist[index];
        if ("type" in dist) {
            return new Vector3(
                ...(this.visibility.includes("move") ? dist.random(relative) : dist.getMode())
            );
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
        this.endPosition = this.getPosition(time + 1);
        this.direction = this.endPosition.clone().sub(this.beginPosition);
    }

    /**
     * Changes object position with a `delta` position.
     */
    private tick(): void {
        // update object position
        const object = this.parent.class;
        const actualPosition = new Vector3();
        object.getWorldPosition(actualPosition);

        const ratioVector = this.direction.clone().multiplyScalar(this.delta);
        const axis = this.beginPosition.clone().sub(actualPosition).add(ratioVector);
        const norm = axis.length();

        object.translateOnAxis(axis.normalize(), norm);
    }

    /**
     * Update object location to one of the possible position at desired time.
     *
     * @param time Time to update position.
     */
    public update(time?: number): void {
        if (time) {
            const index = Math.trunc(time);
            // set new direction if needed
            if (Math.abs(index - Math.trunc(this.parent.getTimeIndex())) >= 1) {
                this.updateDirection(time);
                const dist = this.dist[index];
                if ("type" in dist) {
                    (this.children[0] as Representation).update(dist.representation(true));
                } else {
                    (this.children[0] as Representation).update([0, 0, 0]);
                }
            }
            this.delta = time - index;
        } else {
            time = this.parent.getTimeIndex();
            this.delta += 0.01;
            // set new direction on delta reset
            if (this.delta > 1) {
                this.delta -= Math.trunc(this.delta);
                this.updateDirection(time);
            }
        }
        this.tick();
    }
}
