import { Euler, Group, Vector3 } from "three";

import { Distribution } from "@/models/distribution/dist";
import { MultivariateVonMises } from "@/models/distribution/multiVonMises";
import type { PDTObject } from "@/models/object.model";

export type RotationJSON = { dist: Distribution } | [number, number, number];

export const toDistribution = (dist: Distribution) => {
    return new MultivariateVonMises(dist as MultivariateVonMises, "deg");
};
export class Rotation extends Group {
    declare parent: PDTObject;
    private timeIndex: number;
    private dist: (Distribution | [number, number, number])[];

    private beginRotation: Vector3;
    private endRotation: Vector3;
    private rotationDelta!: Vector3;

    constructor(parent: PDTObject, rotJSON: RotationJSON[]) {
        super();
        this.parent = parent;
        this.userData.type = "Location";
        this.visible = false;
        this.dist = [];
        this.timeIndex = 0;

        // get distributions from JSON data
        const object = this.parent.getObject();
        rotJSON.forEach((timestamp) => {
            if (!("dist" in timestamp)) {
                this.dist.push(timestamp);
            } else {
                this.dist.push(toDistribution(timestamp.dist));
            }
        });

        // initialize rotation
        this.beginRotation = new Vector3();
        this.endRotation = this.getRotation(0);
        this.rotationDelta = new Vector3();
        this.setRotationDir(0);

        // set initial rotation
        object.setRotation(new Euler().setFromVector3(this.beginRotation));
    }

    private getRotation(t: number, relative: boolean = false): Vector3 {
        const index = t < this.dist.length ? Math.trunc(t) : this.dist.length - 1;
        const dist = this.dist[index];
        if (dist instanceof Distribution) {
            return new Vector3(...dist.random(relative));
        } else {
            return new Vector3(...dist);
        }
    }

    private setRotationDir(time: number) {
        this.beginRotation = this.endRotation;
        this.endRotation = this.getRotation(time + 1);

        const beginRotArray: [number, number, number] = this.beginRotation.toArray();
        const endRotArray: [number, number, number] = this.endRotation.toArray();
        const rotDeltaArray = endRotArray.map((e: number, i) => {
            const diff = e - beginRotArray[i];
            const mod = ((Math.abs(diff) + Math.PI) % (2 * Math.PI)) - Math.PI;
            return diff < 0 ? -mod : mod;
        });

        this.rotationDelta.set(...(rotDeltaArray as [number, number, number]));
        this.timeIndex = Math.trunc(time);
    }

    public updateRotation(time: number) {
        time = time % this.dist.length;
        const delta = time - Math.trunc(time);

        // set new direction if needed
        if (Math.abs(Math.trunc(time) - this.timeIndex) >= 1) {
            this.setRotationDir(time);
        }

        // update object position
        const object = this.parent.getObject();

        const ratioVector = this.rotationDelta.clone().multiplyScalar(delta);
        const euler = new Euler().setFromVector3(this.beginRotation.clone().add(ratioVector));

        object.setRotation(euler);
    }
}
