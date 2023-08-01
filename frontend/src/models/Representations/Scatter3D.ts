/**
 * Implementation of box representation. Can be use to represent {@link UniformContinuous} distribution.
 *
 * @module representation.scatter3D
 */

import {
    BufferAttribute,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Points,
    PointsMaterial,
} from "three";
import type { Representation } from "@/models/Representations";

/**
 * Implementation of scatter3D representation.
 *
 */
export class Scatter3D extends Points implements Representation {
    /** Representation name */
    static repName = "scatter3D";
    /** Minimum color for probability/distance scale */
    private static minColor = new Color(0x0d0887); // Blue
    /** Maximum color for probability/distance scale */
    private static maxColor = new Color(0xf0f921); // Yellow

    /**
     * Implementation of scatter3D representation.
     *
     * @param dataPoints Points with probabilities to plot : `[x1,y1,z1,p1, ...]`.
     */
    constructor(dataPoints: number[]) {
        if (dataPoints.length < 4) {
            throw new Error("Please give at lease one point with its probability : [x,y,z,p]");
        }
        // Split probabilities from coordinates
        const vertices = dataPoints.filter((_, i) => i % 4 !== 3);
        const probabilities = dataPoints.filter((_, i) => i % 4 === 3);

        // Build geometry points
        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

        // Setup material
        const material = new PointsMaterial({
            vertexColors: true,
            size: 5,
            transparent: true,
            sizeAttenuation: false,
        });

        // Setup colors and opacity depending on point probability
        geometry.setAttribute("color", new BufferAttribute(Scatter3D.getColors(probabilities), 4));

        super(geometry, material);
    }

    /**
     * Compute colors from color scale with given probabilities.
     *
     * @param probabilities : List of probabilities.
     *
     * @returns Color map corresponding to given probabilities.
     */
    private static getColors(probabilities: number[]): Float32Array {
        const colors = new Float32Array(probabilities.length * 4);
        probabilities.forEach((p: number, i: number) => {
            const color = new Color().lerpColors(Scatter3D.minColor, Scatter3D.maxColor, p);
            colors[4 * i] = color.r;
            colors[4 * i + 1] = color.g;
            colors[4 * i + 2] = color.b;
            colors[4 * i + 3] = 0.8 * p;
        });
        return colors;
    }

    /**
     * Set new positions and/or probability points.
     *
     * @param dataPoints New points with probabilities : `[x1,y1,z1,p1, ...]`.
     */
    public update(dataPoints: number[]): void {
        const vertices = dataPoints.filter((_, i) => i % 4 !== 3);
        const probabilities = dataPoints.filter((_, i) => i % 4 === 3);

        this.geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.geometry.setAttribute(
            "color",
            new BufferAttribute(Scatter3D.getColors(probabilities), 4)
        );
    }
}
