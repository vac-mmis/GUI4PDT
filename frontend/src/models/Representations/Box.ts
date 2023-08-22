/**
 * Implementation of box representation. Can be use to represent {@link UniformContinuous} distribution.
 *
 * @module Representation.Box
 */

import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

import type { Representation } from "@/models/Representations";

/** Epsilon value to change zero coordinates. */
export const epsilon = 0.001;

/**
 * Implementation of box representation.
 *
 */
export class Box extends Mesh implements Representation {
    /** Representation name */
    static repName = "box";
    /** Current dimensions, used for updates */
    private currentDim: [number, number, number];

    /**
     * Creates new box representation.
     *
     * @param dim Box dimensions : [x,y,z].
     */
    constructor(dim: [number, number, number]) {
        dim = Box.nonZero(dim);

        const geometry = new BoxGeometry(...dim);
        const material = new MeshStandardMaterial({
            color: 0xf0f921,
            transparent: true,
            opacity: 0.5,
        });
        super(geometry, material);
        this.currentDim = dim;
    }

    /**
     * Corrects dimensions to have no zero coordinates (changed to `epsilon = 0.001`).
     *
     * @param dim Dimensions to correct : [x,y,z].
     *
     * @returns Corrected dimensions.
     */
    private static nonZero(dim: [number, number, number]): [number, number, number] {
        if (dim.length !== 3) {
            throw new Error("Box must have 3 dimensions");
        }
        return dim.map((d) => (d <= epsilon ? epsilon : d)) as [number, number, number];
    }

    /**
     * Set new dimensions to box.
     *
     * @param dim Desired dimensions.
     */
    public update(dim: [number, number, number]): void {
        dim = Box.nonZero(dim);
        this.geometry.scale(
            dim[0] / this.currentDim[0],
            dim[1] / this.currentDim[1],
            dim[2] / this.currentDim[2]
        );
        this.currentDim = dim;
    }
}
