import { Group, Vector3 } from "three";

import { Distribution } from "@/models/distribution/dist";
import { UniformContinuous } from "@/models/distribution/uniContinuous";
import { MultivariateNormal } from "@/models/distribution/multiNormal";

import { Scatter3D } from "@/models/representation/scatter3D";
import { BoxDist } from "@/models/representation/boxDist";

import type { PDTObject } from "@/models/object.model";

export type LocationJSON =
    | {
          dist: Distribution;
      }
    | [number, number, number];

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
    private dist: (Distribution | [number, number, number])[];

    constructor(parent: PDTObject, locJSON: LocationJSON[]) {
        super();
        this.parent = parent;
        this.userData.type = "Location";
        this.visible = false;
        this.dist = [];

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
}
