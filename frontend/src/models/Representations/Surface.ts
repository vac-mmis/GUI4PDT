/**
 * Implementation of box representation. Can be use to represent {@link UniformContinuous} distribution.
 *
 * @module representation.scatter3D
 */

import {
    DoubleSide,
    Float32BufferAttribute,
    Material,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
} from "three";
import type { Representation } from "@/models/Representations";
import { transpose } from "mathjs";

/**
 * Implementation of scatter3D representation.
 *
 */
export class Surface extends Mesh implements Representation {
    /** Representation name */
    static repName = "surface";

    /**
     * Implementation of surface representation.
     *
     * @param dataPoints Points with probabilities to plot : `[x1,y1,z1,p1, ...]`.
     * @param material Desired surface material (default : blue semi-transparent).
     */
    constructor(
        data: [number, number, number, number][],
        material: Material = new MeshBasicMaterial({
            color: 0x004a99,
            transparent: true,
            opacity: 0.5,
        })
    ) {
        if (data.length < 4) {
            throw new Error("Please give at lease one point with its probability : [x,y,z,p]");
        }

        // set dimensions
        const transposed = transpose(data);

        let rows = 0;
        for (let index = 0; transposed[1][index] === transposed[1][0]; index++) {
            rows++;
        }
        const cols = data.length / rows;
        const xLength = Math.max(...transposed[0]) - Math.min(...transposed[0]);
        const yLength = Math.max(...transposed[1]) - Math.min(...transposed[1]);

        const geometry = new PlaneGeometry(xLength, yLength, rows - 1, cols - 1);

        // setup double-sided material
        material.side = DoubleSide;

        // init surface attributes
        super(geometry, material);

        // set points height
        this.update(data);
    }

    /**
     * Update surface grid;
     *
     * @param dataPoints New points with probabilities : `[x1,y1,z1,p1, ...]`.
     */
    public update(data: [number, number, number, number][]): void {
        const vertices = data.flat().filter((_, i) => i % 4 !== 3);
        this.geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    }
}
