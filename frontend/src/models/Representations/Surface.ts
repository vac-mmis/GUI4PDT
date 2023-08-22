/**
 * Implementation of surface representation.
 *
 * @module Representation.Surface
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
 * Implementation of surface representation.
 *
 */
export class Surface extends Mesh implements Representation {
    /** Representation name */
    static repName = "surface";

    /**
     * Implementation of surface representation.
     *
     * @param dataPoints Points with z variations to plot : `[x1,y1,z1,dz1, ...]`.
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

        const geometry = new PlaneGeometry(undefined, undefined, rows - 1, cols - 1);

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
     * @param dataPoints New points with z variations : `[[x1,y1,z1,dz1], ...]`.
     */
    public update(data: [number, number, number, number][]): void {
        // Sort data from -X to X and then from Y to -Y coordinates
        data.sort((pointA, pointB) => {
            const [xA, yA] = [pointA[0], pointA[1]];
            const [xB, yB] = [pointB[0], pointB[1]];

            if (xA === xB) {
                return yA >= yB ? 1 : -1; // Sort by Y if X is the same
            } else {
                return xA >= xB ? 1 : -1; // Sort by X
            }
        });
        // Get vertices from data
        const vertices = data.flat().filter((_, i) => i % 4 !== 3);
        // Upgate geometry coordinates
        this.geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    }
}
