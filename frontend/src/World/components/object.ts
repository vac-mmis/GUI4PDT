import { type Group, Mesh, Vector3, MeshStandardMaterial } from "three";

export function createObject(model: Group, position: [number, number, number]): Group {
    // create a geometry
    const object = model.clone();
    object.position.set(position[0], position[1], position[2]);
    return object;
}
