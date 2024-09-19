/**
 * Express.JS controllers for PDTs
 *
 * @module upload.controller
 */

import { Request, Response } from "express";

import { logger } from "@/utils/logger";
import multer from "multer";
import path from "path";
import fs from "fs";
import unzipper from "unzipper";

const pdtPath = path.resolve(process.env.DATA ?? "").normalize();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const firstFileName = req.body.firstFileName;
        const projectName = req.body.projectName;
        const projectPath = path.join(pdtPath, projectName).toString();

        if (file.originalname === firstFileName) {
            if (!fs.existsSync(projectPath)) {
                fs.mkdirSync(projectPath);
                cb(null, projectPath);
            } else {
                cb(new Error("Project already exists"), "");
            }
        } else {
            cb(null, projectPath);
        }
    },
    filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename);
    },
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedFileTypes = [
        "image/jpeg",
        "image/png",
        "image/bmp",
        "image/jpg",
        "application/zip",
        "application/octet-stream",
        "application/x-zip-compressed",
        "multipart/x-zip",
        "text/csv",
        "application/json",
        "model/gltf-binary",
    ];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("This file is not allowed"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
const multerUploadMulti = upload.array("files");

/**
 * Create a new project folder in /data and upload multiple files. ZIP files are automatically unzipped.
 *
 * @param req files attribute which contains the list of the uploaded files
 * @param res HTTP Response :
 * - 200 confirmation + project was created / files uploaded and unzipped if necessary
 * - 400 error + project was not created
 */
export function uploadFiles(req: Request, res: Response): void {
    multerUploadMulti(req, res, (err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        } else {
            const files = req.files as Express.Multer.File[];
            if (files && files.length > 0) {
                const zipFiles = files.filter((file) => path.extname(file.filename) === ".zip");
                if (zipFiles.length > 0) {
                    zipFiles.forEach((zip) => {
                        unzipFile(zip.path, zip.destination).then(() => {
                            fs.unlink(zip.path, (err) => {
                                if (err) {
                                    logger.error(err.message);
                                } else {
                                    logger.info("Successfully deleted file: " + zip.filename);
                                }
                            });
                        });
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "File(s) uploaded successfully.",
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "No file(s) uploaded.",
                });
            }
        }
    });
}

function getEmpty(filename: string) {
    const jsonData = {
        name: "default",
        timestep: 0,
        timestamp: null,
        objects: [
            {
                id: 0,
                class: "reefring",
                location: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: 1,
                material: "concrete",
            },
        ],
    };

    jsonData.name = filename;
    return jsonData;
}

/**
 * Create a new project folder in /data and inserts an PDT with a dummy object.
 *
 * @param req req.body.name contains the name of the PDT
 * @param res HTTP Response :
 * - 200 confirmation + project was created
 * - 400 error writing the file or project already exists
 */
export function newfromempty(req: Request, res: Response): void {
    const pdtPath = path.resolve(process.env.DATA ?? "").normalize();

    const projectName = req.body.name;
    const projectPath = path.join(pdtPath, projectName).toString();
    const filePath = path.join(projectPath, "pdt.json");

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);

        fs.writeFile(filePath, JSON.stringify(getEmpty(projectName), null, 2), (err) => {
            if (err) {
                logger.error("Error writing file:", err);
            } else {
                logger.info(`File ${filePath} created successfully in ${projectPath}`);
            }
        });

        res.status(200).json({
            success: true,
            message: "Project created successfully",
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Project already exists",
        });
    }
}

export function updateClassname(req: Request, res: Response): void {
    const pdtPath = path.resolve(process.env.DATA ?? "").normalize();

    const projectName = req.body.name;
    const className = req.body.className;

    const projectPath = path.join(pdtPath, projectName).toString();
    const files = fs.readdirSync(projectPath);

    for (const file of files) {
        const filePath = path.join(projectPath, file);
        const data = fs.readFileSync(filePath, "utf-8");

        if (!validateJSON(data)) {
            continue;
        }
        const obj = JSON.parse(data);

        if (obj.timestep === 0) {
            obj.objects[0].class = className;

            try {
                fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
            } catch (error) {
                res.status(400).json({
                    success: true,
                    message: "Error writing the file",
                });
                logger.error(error);
            }
            break;
        }
    }

    res.status(200).json({
        success: true,
        message: "Project created successfully",
    });
}

const unzipFile = async (zipFile: string, destiantion: string) => {
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
};

function validateJSON(body: string) {
    try {
        const data = JSON.parse(body);
        return data;
    } catch (error) {
        return null;
    }
}
