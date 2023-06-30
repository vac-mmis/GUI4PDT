import { Group } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

export async function loadModel(model: { name: string; content: string }): Promise<Group> {
    const base64 = atob(model.content);
    const buffer = new Uint8Array(base64.length).map((_, i) => base64.charCodeAt(i)).buffer;

    return loader
        .parseAsync(buffer, "")
        .then((gltf) => {
            const scene = gltf.scene;
            scene.name = model.name.split(".glb")[0].toLowerCase();
            return scene;
        })
        .catch((error) => {
            console.error("Model cannot be loaded", error);
            return new Group();
        });
}
