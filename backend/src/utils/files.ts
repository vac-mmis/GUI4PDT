/**
 * File utils for file management
 *
 * @module utils.files
 */
import { constants } from "fs";
import { access, stat } from "fs/promises";

/**
 * Check if file exists
 *
 */
export async function checkFileExists(filePath: string) {
    try {
        await access(filePath, constants.F_OK);

        return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.code === "ENOENT") {
            return false;
        } else {
            throw error;
        }
    }
}

/**
 * Check if file is directory
 *
 */
export async function checkDirectory(path: string) {
    try {
        const stats = await stat(path);
        return stats.isDirectory();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.code === "ENOENT") {
            return null;
        } else {
            throw error;
        }
    }
}
