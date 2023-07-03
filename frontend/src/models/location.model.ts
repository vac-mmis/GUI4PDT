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
} from "three";

export type LocationJSON =
    | {
          dist: MultivariateNormal | UniformContinuous;
      }
    | [number, number, number];

function createScatterPlot(pointsData: number[]): Group {
    const group = new Group();

    const vertices = pointsData.filter((_, i) => i % 4 !== 3);
    const probs = pointsData.filter((p, i) => i % 4 === 3);

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

    const points = new Points(geometry, material);

    // Add the points object to the group
    group.add(points);

    return group;
}
export class Location extends Group {
    objID: number;

    constructor(objID: number, locJSON: LocationJSON) {
        super();
        this.objID = objID;

        if (!("dist" in locJSON)) {
            return;
        }
        if (locJSON.dist.type === "multivariate-normal") {
            const dataPoints = multivariateNormal(locJSON.dist);
            const scatterPlot = createScatterPlot(dataPoints);
            this.add(scatterPlot);
        } else {
            return;
        }
    }
}
