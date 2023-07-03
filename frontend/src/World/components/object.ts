import {
    Group,
    Mesh,
    MeshStandardMaterial,
    MeshBasicMaterial,
    MeshPhongMaterial,
    BoxGeometry,
} from "three";

export function createObject(
    model: Group,
    position: [number, number, number],
    scale: number = 1,
    opacity: number = 1
): Group {
    const object = new Group();

    // Traverse through all children of the model and set transparency for each material
    model.traverse((child) => {
        if (child instanceof Mesh) {
            const clonedMaterial = child.material.clone();
            // Set transparency for the material
            if (opacity < 1) {
                if (
                    clonedMaterial instanceof MeshStandardMaterial ||
                    clonedMaterial instanceof MeshBasicMaterial ||
                    clonedMaterial instanceof MeshPhongMaterial
                ) {
                    clonedMaterial.transparent = true;
                    clonedMaterial.opacity = opacity;
                }
            }
            const clonedMesh = new Mesh(child.geometry, clonedMaterial);
            if (opacity < 1) {
                // Enable alpha sorting
                clonedMesh.renderOrder = 1; // Set a higher render order for transparency
                clonedMesh.material.depthTest = true; // Enable depth testing
                clonedMesh.material.depthWrite = false; // Disable writing to the depth buffer
            }
            object.add(clonedMesh);
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
