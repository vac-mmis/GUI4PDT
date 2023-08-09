/**
 * Implementation of object representation. Can be use to represent {@link Categorical} distribution.
 *
 * @module representation.object
 */

import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";
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
        model?: Group,
        material: MeshStandardMaterial = new MeshStandardMaterial(),
        position: [number, number, number] = [0, 0, 0],
        scale: number = 1,
        opacity: number = 1
    ) {
        super();
        this.name = model?.name || "default";
        this.currentScale = scale;
        this.position.set(...position);

        // Setup opacity on material is required
        if (opacity < 1) {
            material.transparent = true;
            material.opacity = opacity;
        }

        if (!model) {
            // If no model is provided, default mesh is created
            const geometry = new BoxGeometry(scale, scale, scale);
            this.add(new Mesh(geometry, material));
        } else {
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
    }

    /**
     * Update object opacity and/or scale.
     *
     * @param opacity New opacity.
     * @param scale New scale.
     */
    public update(opacity?: number, scale: number = 1): void {
        // Traverse through all children of the model and set transparency for each material
        if (opacity) {
            this.traverse((child) => {
                if (child instanceof Mesh) {
                    if (opacity < 1) {
                        // Enable alpha sorting
                        child.material.transparent = true;
                        child.material.opacity = opacity;
                    }
                }
            });
        }
        // Update scale
        if (scale !== this.currentScale) {
            this.scale.set(scale, scale, scale);
            this.currentScale = scale;
        }
    }
}
