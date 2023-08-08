/**
 * This store is used to load, store and provide all available PDT
 *
 * @module pdt.store
 */

import { readdir, stat } from "fs/promises";
import path from "path";
import "dotenv/config";

import { PDT } from "@/models";

const dataPath = path.resolve(process.env.DATA ?? "").normalize();
const PDTs: PDT[] = [];

/**
 * Loads all available PDT for API providing
 */
export async function load(): Promise<void> {
    const pdtDirs = await readdir(dataPath);
    await Promise.all(
        pdtDirs.map(async (PDTDir) => {
            const fileStat = await stat(`${dataPath}/${PDTDir}`);
            if (fileStat.isDirectory()) {
                const pdt = new PDT(`${dataPath}/${PDTDir}`);
                await pdt.init();
                PDTs.push(pdt);
            }
        })
    ).catch((err) => {
        throw new Error(`PDTs loading failed : ${err}`);
    });
}

/**
 * Get loaded PDT
 *
 * @returns Array of all loaded materials
 */
export function get(): Partial<PDT>[] {
    return PDTs.map((pdt) => pdt.getPublicPDT());
}

/**
 * List all loaded PDT names
 *
 * @returns Array of loaded PDT names
 */
export function list(): string[] {
    return PDTs.map((pdt) => pdt.getName());
}

/**
 * Find loaded PDT by its name
 * @param name Name of the targeted PDT
 *
 * @returns Targeted PDT if exists, else undefined
 */
export function find(name: string): PDT | undefined {
    return PDTs.find((pdt: PDT) => pdt.name === name);
}
