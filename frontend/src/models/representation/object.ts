import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import { Material } from "../material.model";

export class ObjectRepresentation extends Group {
    private previousScale: number;

    constructor(
        model: Group,
        material: Material,
        position: [number, number, number],
        scale: number = 1,
        opacity: number = 1
    ) {
        super();
        this.previousScale = scale;
        // Traverse through all children of the model and set transparency for each material
        model.traverse((child) => {
            if (child instanceof Mesh) {
                const newMaterial = material.getMaterial(opacity);
                const newMesh = new Mesh(child.geometry, newMaterial);
                if (opacity < 1) {
                    // Enable alpha sorting
                    newMesh.renderOrder = 1; // Set a higher render order for transparency
                    newMesh.material.depthTest = true; // Enable depth testing
                    newMesh.material.depthWrite = false; // Disable writing to the depth buffer
                }
                this.add(newMesh);
            }
        });

        this.position.set(...position);
        this.scale.set(scale, scale, scale);
        this.name = model.name;
    }

    public static emptyObject(position: [number, number, number]): Mesh {
        const geometry = new BoxGeometry(2, 2, 2);
        const material = new MeshStandardMaterial();

        const object = new Mesh(geometry, material);
        object.position.set(...position);
        return object;
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
