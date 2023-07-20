import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import { Material } from "../material.model";

export class ObjectRepresentation extends Group {
    private previousScale: number;

    constructor(
        model: Group | undefined,
        material: Material | undefined,
        position: [number, number, number],
        scale: number = 1,
        opacity: number = 1
    ) {
        super();
        this.name = model?.name || "default";
        this.previousScale = scale;
        this.position.set(...position);
        const newMaterial = material ? material.getMaterial(opacity) : new MeshStandardMaterial();

        if (!model) {
            // If no model is provided, default mesh is created
            const geometry = new BoxGeometry(0.5, 0.5, 0.5);
            this.add(new Mesh(geometry, material));
        } else {
            // Traverse through all children of the model and set transparency for each material
            model.traverse((child) => {
                if (child instanceof Mesh) {
                    const newMesh = new Mesh(child.geometry, newMaterial.clone());
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

    public update(opacity?: number, scale: number = 1) {
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
        if (scale !== this.previousScale) {
            this.scale.set(scale, scale, scale);
            this.previousScale = scale;
        }
    }
}
