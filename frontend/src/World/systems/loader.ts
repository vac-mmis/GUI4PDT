/**
 * This wrapper implements a set of functions to load Three.JS elements (Textures, Materials, Models...) from files.
 *
 * @remark File format are defined in dedicated {@link Store} modules.
 *
 * @model world.loader.
 */
import { Group, MeshStandardMaterial, TextureLoader } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

import type { MaterialFile } from "@/store/material.store";
import type { ModelFile } from "@/store/model.store";

// GLTFLoader with compression
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

// TextureLoader
const textureLoader = new TextureLoader();

/** Converts strings to Uint8 buffer */
const stringToBuffer = (content: string) => {
    const base64 = atob(content);
    return new Uint8Array(base64.length).map((_, i) => base64.charCodeAt(i)).buffer;
};

/**
 * Loads model from file blobs provided by backend API
 *
 * @remark For the moment, this loader only handle GLTF 3D models in `.glb` format.
 *
 * @param model Model file blob to load.
 *
 * @return Loaded model as Three.JS `Group` object.
 */
export async function loadModel(model: ModelFile): Promise<Group> {
    // Bufferize content for loading
    const buffer = stringToBuffer(model.content);
    return loader
        .parseAsync(buffer, "")
        .then((gltf: GLTF) => {
            // Give name to model before return
            const scene = gltf.scene;
            scene.name = model.name.split(".glb")[0].toLowerCase();
            return scene;
        })
        .catch((error) => {
            console.error("Model cannot be loaded", error);
            return new Group();
        });
}

/**
 * Loads material from file blobs provided by backend API
 *
 * @remark For the moment, this loader only PNG and JPEG files as material components. See {@link material.store} and backend API to have details on material ressources format.
 *
 * @param model Material file blob to load.
 *
 * @return Loaded model as Three.JS `MeshStandardMaterial` object.
 */
export async function loadMaterial(materialBlob: MaterialFile): Promise<MeshStandardMaterial> {
    const material = new MeshStandardMaterial();

    material.name = materialBlob.name;

    if (materialBlob.albedo) {
        material.map = textureLoader.load(
            URL.createObjectURL(new Blob([stringToBuffer(materialBlob.albedo)]))
        );
    }
    if (materialBlob.ao) {
        material.aoMap = textureLoader.load(
            URL.createObjectURL(new Blob([stringToBuffer(materialBlob.ao)]))
        );
    }
    if (materialBlob.metalness) {
        material.metalnessMap = textureLoader.load(
            URL.createObjectURL(new Blob([stringToBuffer(materialBlob.metalness)]))
        );
    }
    if (materialBlob.roughness) {
        material.roughnessMap = textureLoader.load(
            URL.createObjectURL(new Blob([stringToBuffer(materialBlob.roughness)]))
        );
    }
    if (materialBlob.normal) {
        material.normalMap = textureLoader.load(
            URL.createObjectURL(new Blob([stringToBuffer(materialBlob.normal)]))
        );
    }
    return material;
}
