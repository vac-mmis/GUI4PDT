/**
 * Implementation of object representation. Can be use to represent {@link Categorical} distribution.
 *
 * @module Representation.Object
 */

import { Group, Mesh, MeshStandardMaterial } from "three";
import type { Representation } from "@/models/Representations";

/**
 * Implementation of object representation.
 *
 */
export class ObjectRepresentation extends Group implements Representation {
    /** Representation name */
    static repName = "object";
    /** Current scale, used for updates */
    private currentScale: number;

    /**
     * Creates new object representation from model, material and object data
     *
     * @param model Model from which create object.
     * @param material Object material (default : `new MeshStandardMaterial()`);
     * @param position Object position, relative to parent group (default : `[0,0,0]`).
     * @param scale Object scale (default : `1`).
     * @param opacity Object opacity (default : `1`). Only used if `material` is undefined
     */
    constructor(
        model: Group,
        material: MeshStandardMaterial = new MeshStandardMaterial(),
        scale: number = 1,
        opacity: number = 1
    ) {
        super();
        this.name = model?.name ?? "default";
        this.currentScale = scale;

        // Setup opacity on material is required
        if (opacity < 1) {
            material.transparent = true;
            material.opacity = opacity;
        }

        // Else, traverse through all children of the model and enable transparency for each material
        model.traverse((child) => {
            if (child instanceof Mesh) {
                const newMesh = new Mesh(child.geometry, material.clone());
                if (opacity < 1) {
                    // Enable alpha sorting
                    newMesh.renderOrder = 1; // Set a higher render order for transparency
                    newMesh.material.depthTest = true; // Enable depth testing
                    newMesh.material.depthWrite = false; // Disable writing to the depth buffer
                }
                this.add(newMesh);
            }
        });
        // Setup scale only if model provided
        this.scale.set(scale, scale, scale);
    }

    /**
     * Update object opacity and/or scale.
     *
     * @param opacity New opacity.
     * @param scale New scale.
     */
    public update(opacity?: number, scale: number = 1): void {
        if (opacity !== undefined && opacity !== null) {
            this.visible = opacity > 0;
            if (this.visible) {
                // Traverse through all children of the model and set transparency for each material

                this.traverse((child) => {
                    if (child instanceof Mesh) {
                        child.material.transparent = opacity < 1;
                        child.material.opacity = opacity;
                    }
                });
            }
        }
        // Update scale
        if (scale !== this.currentScale) {
            this.scale.set(scale, scale, scale);
            this.currentScale = scale;
        }
    }
}
