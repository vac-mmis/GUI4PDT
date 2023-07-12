import { Distribution } from "@/models/distribution/dist.model";
import { UniformContinuous } from "@/models/distribution/uniContinuous.model";
import { MultivariateNormal } from "@/models/distribution/multiNormal.model";

import {
    Group,
    Points,
    BufferGeometry,
    Float32BufferAttribute,
    PointsMaterial,
    Color,
    BufferAttribute,
    Vector3,
    Object3D,
    MeshStandardMaterial,
    Mesh,
    BoxGeometry,
} from "three";

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

function createScatterPlot(pointsData: number[]): Points {
    const vertices = pointsData.filter((_, i) => i % 4 !== 3);
    const probs = pointsData.filter((_, i) => i % 4 === 3);

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

    const material = new PointsMaterial({
        vertexColors: true,
        size: 5,
        transparent: true,
        sizeAttenuation: false,
    });

    // Setup colors and opacity
    const minColor = new Color(0x0d0887); // Blue
    const maxColor = new Color(0xf0f921); // Yellow
    const colors = new Float32Array(probs.length * 4);
    probs.forEach((p: number, i: number) => {
        const color = new Color().lerpColors(minColor, maxColor, p);
        colors[4 * i] = color.r;
        colors[4 * i + 1] = color.g;
        colors[4 * i + 2] = color.b;
        colors[4 * i + 3] = 0.8 * p;
    });
    geometry.setAttribute("color", new BufferAttribute(colors, 4));

    return new Points(geometry, material);
}

function createContinuousPlot(dim: [number, number, number]) {
    const geometry = new BoxGeometry(...dim);
    const material = new MeshStandardMaterial({ color: 0xf0f921, transparent: true, opacity: 0.5 });
    return new Mesh(geometry, material);
}

export class Location extends Group {
    private dist?: Distribution;

    constructor(parent: Object3D, locJSON: LocationJSON) {
        super();
        this.parent = parent;
        this.userData.type = "Location";
        this.visible = false;

        if (!("dist" in locJSON)) {
            const scatterPlot = createScatterPlot([0, 0, 0]);
            this.parent.position.set(...locJSON);
            this.add(scatterPlot);
        } else {
            this.dist = toDistribution(locJSON.dist);
            this.parent.position.set(...(this.dist.getMean() as [number, number, number]));
            this.dist.setMean([0, 0, 0]);
            const dataPoints = this.dist.representation();

            if (this.dist instanceof MultivariateNormal) {
                const scatterPlot = createScatterPlot(dataPoints);
                this.add(scatterPlot);
            } else if (this.dist instanceof UniformContinuous) {
                const continuousPlot = createContinuousPlot(
                    dataPoints.splice(0, 3) as [number, number, number]
                );
                this.add(continuousPlot);
            }
        }
    }

    public getPosition(t: number): Vector3 {
        if (this.dist) {
            return new Vector3(...this.dist.random());
        } else {
            return new Vector3(0, 0, 0);
        }
    }
}
