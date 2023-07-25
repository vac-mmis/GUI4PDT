/**
 * This store is used to load, store and provide materials
 *
 * @module material.store
 */

import { readFile, readdir } from "fs/promises";
import path from "path";

import type { MaterialFile } from "@/types/file.types";

const materialsPath = path.resolve("assets", `materials`).normalize();
const materials: MaterialFile[] = [];

/**
 * Transforms a material folder with its files to MaterialFile format for API providing
 * @param materialPath Path to material folder
 *
 * @returns Promise with the generated MaterialFile blob
 * @internal
 */
async function serializeMaterial(materialPath: string): Promise<MaterialFile> {
    const materialFiles = await readdir(materialPath);
    const material = {} as MaterialFile;
    material.name = path.basename(materialPath);
    await Promise.all(
        materialFiles.map(async (fileName) => {
            const filePath = path.join(materialPath, fileName);
            const attribute = fileName.split("_").slice(-1)[0].split(".")[0] as keyof MaterialFile;
            const fileData = await readFile(filePath);
            material[attribute] = fileData.toString("base64");
        })
    );
    return material;
}

/**
 * Loads all available materials for API providing
 */
export async function load(): Promise<void> {
    await readdir(materialsPath)
        .then((materialFolders) =>
            Promise.all(
                materialFolders.map(async (materialFolder: string) =>
                    materials.push(
                        await serializeMaterial(path.join(materialsPath, materialFolder))
                    )
                )
            )
        )
        .catch((err) => {
            throw new Error(`Materials loading failed : ${err}`);
        });
}

/**
 * Get loaded materials
 *
 * @returns Array of all loaded materials
 */
export function get(): MaterialFile[] {
    return materials;
}

/**
 * Find loaded material by its name
 * @param name Name of the targeted material
 *
 * @returns Targeted material if exists, else undefined
 */
export function find(name: string) {
    return materials.find((material) => material.name === name);
}
