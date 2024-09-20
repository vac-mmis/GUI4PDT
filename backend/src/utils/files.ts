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

/**
 * Remove a directory recursivly
 *
 */
import * as fs from "fs";
import * as path from "path";
import * as util from "util";

const readdirAsync = util.promisify(fs.readdir);
const unlinkAsync = util.promisify(fs.unlink);
const rmdirAsync = util.promisify(fs.rmdir);

export async function removeDirectoryRecursive(directory: string): Promise<void> {
    const files = await readdirAsync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);

        const stats = await fs.promises.stat(filePath);

        if (stats.isDirectory()) {
            await removeDirectoryRecursive(filePath);
        } else {
            await unlinkAsync(filePath);
        }
    }

    await rmdirAsync(directory);
}

/**
 * Unzip a ZIP archive
 *
 */
import unzipper from "unzipper";
import { logger } from "./logger";

export async function unzipFile(zipFile: string, destiantion: string) {
    try {
        const readStream = fs.createReadStream(zipFile);
        const writeStream = unzipper.Extract({ path: destiantion });

        readStream.pipe(writeStream);

        writeStream.on("close", () => {
            logger.info("File unzipped and saved successfully");
        });
    } catch (error) {
        logger.error("Error unzipping the file:", error);
    }
}
