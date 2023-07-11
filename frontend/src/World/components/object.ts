import { Group, Mesh, MeshStandardMaterial, BoxGeometry } from "three";

function createMaterial(material: MeshStandardMaterial, opacity: number = 1): MeshStandardMaterial {
    const newMaterial = material.clone();
    if (opacity < 1) {
        newMaterial.transparent = true;
        newMaterial.opacity = opacity;
    }
    return newMaterial;
}

export function createObject(
    model: Group,
    material: MeshStandardMaterial,
    position: [number, number, number],
    scale: number = 1,
    opacity: number = 1
): Group {
    const object = new Group();

    // Traverse through all children of the model and set transparency for each material
    model.traverse((child) => {
        if (child instanceof Mesh) {
            const newMaterial = createMaterial(material, opacity);
            const newMesh = new Mesh(child.geometry, newMaterial);
            if (opacity < 1) {
                // Enable alpha sorting
                newMesh.renderOrder = 1; // Set a higher render order for transparency
                newMesh.material.depthTest = true; // Enable depth testing
                newMesh.material.depthWrite = false; // Disable writing to the depth buffer
            }
            object.add(newMesh);
        }
    });

    object.position.set(...position);
    object.scale.set(scale, scale, scale);
    return object;
}

export function emptyObject(position: [number, number, number]): Mesh {
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshStandardMaterial();

    const object = new Mesh(geometry, material);
    object.position.set(...position);
    return object;
}
