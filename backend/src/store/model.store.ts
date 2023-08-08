/**
 * This store is used to load, store and provide models
 *
 * @module model.store
 */

import { readFile, readdir, stat } from "fs/promises";
import path from "path";
import "dotenv/config";

import type { ModelFile } from "@/types/file.types";

const modelPath = path.resolve(process.env.MODELS ?? "").normalize();
const models: ModelFile[] = [];

/**
 * Loads all available models for API providing
 */
export async function load(): Promise<void> {
    await readdir(modelPath)
        .then((modelFiles) =>
            Promise.all(
                modelFiles.map(async (file: string) => {
                    const filePath = path.join(modelPath, file);
                    const fileStat = await stat(filePath);
                    if (fileStat.isFile()) {
                        const fileData = await readFile(filePath);
                        models.push({
                            name: path.basename(file, path.extname(file)).toLowerCase(),
                            content: fileData.toString("base64"),
                        });
                    }
                })
            )
        )
        .catch((err) => {
            throw new Error(`Models loading failed : ${err}`);
        });
}

/**
 * Get loaded models
 *
 * @returns Array of all loaded models
 */
export function get(): ModelFile[] {
    return models;
}

/**
 * Find loaded model by its name
 * @public
 *
 * @param name Name of the targeted model
 *
 * @returns Targeted model if exists, else undefined
 */
export function find(name: string) {
    return models.find((model) => model.name === name);
}
