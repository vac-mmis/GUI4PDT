/**
 * Implementation of z variations representation. Can be use to represent {@link UniformContinuous} distribution.
 *
 * @module representation.zVariations
 */

import { BoxGeometry, Color, InstancedMesh, Matrix4, MeshStandardMaterial } from "three";
import type { Representation } from "@/models/Representations";

/**
 * Implementation of z variations representation.
 *
 */
export class ZVariations extends InstancedMesh implements Representation {
    /** Representation name */
    static repName = "z-var";

    /**
     * Implementation of surface representation.
     *
     * @param mapData Grid dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`.
     */
    constructor(mapData: [number, number, number, number][]) {
        if (mapData.length < 4) {
            throw new Error("Please give at lease one point with its z variations : [x,y,z,dz]");
        }

        const geometry = new BoxGeometry(0.05, 0.05, 1);
        const material = new MeshStandardMaterial({
            color: new Color("black"),
            transparent: true,
            opacity: 0.7,
        });

        // init variations attributes
        super(geometry, material, mapData.length);

        // set points height
        this.update(mapData);
    }

    /**
     * Update surface grid;
     *
     * @param dataPoints New points with probabilities : `[x1,y1,z1,p1, ...]`.
     */
    public update(mapData: [number, number, number, number][]): void {
        const matrix = new Matrix4();
        mapData.forEach((coord, i) => {
            matrix.makeScale(1, 1, coord[3]);
            matrix.setPosition(...(coord.splice(0, 3) as [number, number, number]));
            this.setMatrixAt(i, matrix);
        });
        this.visible = false;
    }
}
