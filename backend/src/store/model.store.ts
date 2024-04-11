/**
 * This store is used to load, store and provide models
 *
 * @module model.store
 */

import {  readFile, readdir, stat } from "fs/promises";
import path from "path";
import "dotenv/config";
import { checkFileExists } from "@/utils/files";

import type { ModelFile } from "@/types/file.types";
import { logger } from "@/utils/logger";

const modelPath = path.resolve(process.env.MODELS ?? "").normalize();
let models: ModelFile[] = [];

/**
 * Loads all available models for API providing
 */
export async function load(): Promise<void> {
    models = [];
    await readdir(modelPath)
        .then((modelFiles) =>
            Promise.all(
                modelFiles.map(async (file: string) => {
                    let filePath = path.join(modelPath, file);
                    const objName = path.basename(file, path.extname(file)).toLowerCase();
                    if (!objName.endsWith("_low")) {

                        const { dir, name, ext } = path.parse(filePath);

                        const lowfilePath = path.join(dir, name + "_low" + ext);
                        try {
                            if (await checkFileExists(lowfilePath)) {
                                filePath = lowfilePath;
                              
                            }
                        }
                        catch (error: any) {
                            logger.warn(error)
                        }

                        const fileStat = await stat(filePath);

                        if (fileStat.isFile()) {

                    

                            const fileData = await readFile(filePath);
                            models.push({
                                name: objName,
                                content: fileData.toString("base64"),
                            });

                        }

                    }
                })
            )
        )
        .catch((err) => {
            throw new Error(`Models loading failed : ${err}`);
        });

    logger.info(`Loaded ${models.length} models`);

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


