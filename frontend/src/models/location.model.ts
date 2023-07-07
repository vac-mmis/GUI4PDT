import { multivariateNormal } from "@/services/dist.services";
import type { MultivariateNormal, UniformContinuous } from "@/services/dist.services";

import {
    Group,
    Points,
    BufferGeometry,
    Float32BufferAttribute,
    PointsMaterial,
    Color,
    BufferAttribute,
    Vector3,
    type InterleavedBufferAttribute,
} from "three";

export type LocationJSON =
    | {
          dist: MultivariateNormal | UniformContinuous;
      }
    | [number, number, number];

const NUM_POINTS = 1000;

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

export class Location extends Group {
    private objID: number;
    private timeIndex: number;

    private points?: BufferAttribute | InterleavedBufferAttribute;
    constructor(objID: number, locJSON: LocationJSON) {
        super();
        this.objID = objID;
        this.userData.type = "Location";
        this.visible = false;
        this.timeIndex = 0;

        if (!("dist" in locJSON)) {
            const scatterPlot = createScatterPlot([...locJSON]);
            this.add(scatterPlot);
        } else if (locJSON.dist.type === "multivariate-normal") {
            const dist: MultivariateNormal = {
                type: locJSON.dist.type,
                mean: [0, 0, 0],
                cov: locJSON.dist.cov,
            };
            const dataPoints = multivariateNormal(dist, NUM_POINTS);
            const scatterPlot = createScatterPlot(dataPoints);
            this.add(scatterPlot);

            const points = this.children[0] as Points;
            if (points) {
                this.points = points.geometry.attributes.position;
                this.timeIndex = Math.ceil(Math.random() * this.points.count * 3);
            }
        }
    }

    public getPosition(t: number): Vector3 {
        const points = this.children[0] as Points;
        if (points) {
            this.points = points.geometry.attributes.position;
            this.timeIndex = Math.trunc(t) % this.points.count;
            return new Vector3(
                this.points.array[this.timeIndex],
                this.points.array[this.timeIndex + 1],
                this.points.array[this.timeIndex + 2]
            );
        } else {
            return new Vector3(0, 0, 0);
        }
    }
}
