import { Group, Vector3 } from "three";

import { Distribution } from "@/models/distribution/dist";
import { UniformContinuous } from "@/models/distribution/uniContinuous";
import { MultivariateNormal } from "@/models/distribution/multiNormal";

import { Scatter3D } from "@/models/representation/scatter3D";
import { BoxDist } from "@/models/representation/boxDist";

import type { PDTObject } from "@/models/object.model";

export type LocationJSON = { dist: Distribution } | [number, number, number];

export const toDistribution = (dist: Distribution) => {
    switch (dist.type) {
        case "uniform-continuous":
            return new UniformContinuous(dist as UniformContinuous);
        default:
            return new MultivariateNormal(dist as MultivariateNormal);
    }
};

export class Location extends Group {
    declare parent: PDTObject;
    private timeIndex: number;
    private dist: (Distribution | [number, number, number])[];

    private beginPosition: Vector3;
    private endPosition: Vector3;
    private direction!: Vector3;

    constructor(parent: PDTObject, locJSON: LocationJSON[]) {
        super();
        this.parent = parent;
        this.userData.type = "Location";
        this.visible = false;
        this.timeIndex = 0;
        this.dist = [];

        // get distributions from JSON data
        locJSON.forEach((timestamp, i) => {
            if (!("dist" in timestamp)) {
                this.dist.push(timestamp);
                if (i === 0) {
                    this.parent.position.set(...timestamp);
                    const scatterPlot = new Scatter3D([0, 0, 0]);
                    this.add(scatterPlot);
                }
            } else {
                const dist = toDistribution(timestamp.dist);
                this.dist.push(dist);
                if (i === 0) {
                    this.parent?.position.set(...(dist.getMean() as [number, number, number]));
                    const dataPoints = dist.representation(true);
                    if (dist instanceof MultivariateNormal) {
                        const scatterPlot = new Scatter3D(dataPoints);
                        this.add(scatterPlot);
                    } else if (dist instanceof UniformContinuous) {
                        const continuousPlot = new BoxDist(
                            dataPoints.splice(0, 3) as [number, number, number]
                        );
                        this.add(continuousPlot);
                    }
                }
            }
        });

        // initialize position
        this.beginPosition = new Vector3();
        this.endPosition = new Vector3();
        this.getWorldPosition(this.beginPosition);
        this.getWorldPosition(this.endPosition);

        // set initial position
        this.setPositionDir(this.timeIndex);
    }

    public getPosition(t: number, relative: boolean = false): Vector3 {
        const index = t < this.dist.length ? Math.trunc(t) : this.dist.length - 1;
        const dist = this.dist[index];
        if (dist instanceof Distribution) {
            (this.children[0] as BoxDist | Scatter3D).update(dist.representation(true));
            return new Vector3(...dist.random(relative));
        } else {
            return new Vector3(...dist);
        }
    }

    private setPositionDir(time: number) {
        this.beginPosition = this.endPosition;
        this.endPosition = this.getPosition(time + 1);

        this.direction = this.endPosition.clone().sub(this.beginPosition);
        this.timeIndex = Math.trunc(time);
    }

    public updatePosition(time: number) {
        time = time % this.dist.length;
        const delta = time - Math.trunc(time);

        // set new direction if needed
        if (Math.abs(Math.trunc(time) - this.timeIndex) >= 1) {
            this.setPositionDir(time);
        }

        // update object position
        const object = this.parent.getObject();
        let actualPosition = new Vector3();
        object.getWorldPosition(actualPosition);

        const ratioVector = this.direction.clone().multiplyScalar(delta);
        const axis = this.beginPosition.clone().sub(actualPosition).add(ratioVector);
        const norm = axis.length();

        object.translateOnAxis(axis.normalize(), norm);
    }
}
