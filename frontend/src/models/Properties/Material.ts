/**
 * Implementation of object class (what kind of object it could be).
 *
 * @module object.material
 */

import { MeshStandardMaterial } from "three";
import type { PieData } from "plotly.js-dist-min";

import { Categorical } from "@/models/Distributions";
import type { PDTObject } from "@/models/object.model";
import { materialStore } from "@/store/material.store";

/**
 * Material data type, following the backend API data format.
 */
export type MaterialJSON = string | { dist: Categorical };

/**
 * Implements representation of object material.
 *
 * @remark Object material is the distribution of what material the object is made of. For the moment, this distribution is not directly represented in the object, but only in details panel with a pie chart.
 */
export class Material extends MeshStandardMaterial {
    /** Object which has this material. */
    declare parent: PDTObject;
    /** Material distribution through time. */
    private dist: Categorical[];

    /**
     * Creates object material representation.
     *
     * @param materialJSON Object material data through time.
     */
    constructor(materialJSON: MaterialJSON[]) {
        super();
        this.dist = Categorical.uniformCatagories(materialJSON);
        this.userData.type = "Material";

        // Create object material
        const materials = materialStore();
        const material = materials.find(Object.keys(this.dist[0].getMass())[0]);
        if (material) {
            Object.assign(this, material);
        } else {
            // Apply default material if given material is not available
            Object.assign(this, new MeshStandardMaterial());
        }
    }

    /**
     * TODO : Implement material update through time.
     * Update material representation at desired time.
     *
     * @param time Time to update material.
     */
    public update(time: number) {
        throw new Error("Material update through is not yet implemented");
    }

    /**
     * Get copy of object material with desired opacity.
     *
     * @param opacity Desired opacity (default : `1`).
     *
     * @returns Object `MeshStandardMaterial` Three.JS material.
     */
    public getMaterial(opacity: number = 1): MeshStandardMaterial {
        let material = new MeshStandardMaterial();
        material.copy(this as MeshStandardMaterial);
        if (opacity < 1) {
            material.transparent = true;
            material.opacity = opacity;
        }
        return material;
    }

    /**
     * Get object material representation at desired time.
     *
     * @param t Desired representation time index.
     *
     * @returns Material distribution representation as Plotly.JS pie chart.
     */
    public representation(t: number): Partial<PieData> {
        t = Math.trunc(t);
        const data = this.dist[t].representation();
        return {
            type: "pie",
            values: data.filter((_, i) => i % 2 == 1),
            labels: data.filter((_, i) => i % 2 == 0),
        };
    }
}
