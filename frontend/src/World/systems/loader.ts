import { Group, MeshStandardMaterial, TextureLoader } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import type { MaterialFile } from "@/models/material.model";

// GLTFLoader with compression
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

// TextureLoader
const textureLoader = new TextureLoader();

const stringToBuffer = (content: string) => {
    const base64 = atob(content);
    return new Uint8Array(base64.length).map((_, i) => base64.charCodeAt(i)).buffer;
};

export async function loadModel(model: { name: string; content: string }): Promise<Group> {
    const buffer = stringToBuffer(model.content);
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
