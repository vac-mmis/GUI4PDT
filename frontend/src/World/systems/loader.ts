import type { Group } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const loader = new OBJLoader();

export async function loadModel(path: string): Promise<Group> {
    const loadedData = await loader.loadAsync(path);
    return loadedData;
}
