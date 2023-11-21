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
import unzipper from 'unzipper';


//TODO documentation for uploading file
/**
 * Upload single PDT
 * @param req HTTP Request. Must have `name` attribute with the desired PDT
 * @param res HTTP Response :
 * - 200 confirmation + requested PDT
 * - 404 error if desired PDT doesn't exist
 */

const pdtPath = path.resolve(process.env.DATA ?? "").normalize();



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const firstFileName = req.body.firstFileName;
        const projectName = req.body.projectName;
        const projectPath = path.join(pdtPath, projectName).toString();

        if (file.originalname === firstFileName) {
            if (!fs.existsSync(projectPath)) {
                fs.mkdirSync(projectPath);
                cb(null, projectPath)
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
        "text/csv",
        "application/json",
        "application/zip",
        "model/gltf-binary"
    ];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("This file is not allowed"));
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
const multerUploadMulti = upload.array("files");

export function uploadFiles(req: Request, res: Response): void {


    multerUploadMulti(req, res, (err) => {



        if (err) {
            logger.error(err, err.message);

            res.status(500).json({
                "success": false,
                "message": err.message
            });

        } else {
            const files = req.files as Express.Multer.File[]
            if (files && files.length > 0) {

                const zipFiles = files.filter(file => path.extname(file.filename) === ".zip");
                if (zipFiles.length > 0) {
                    zipFiles.forEach(zip => {
                        unzipFile(zip.path, zip.destination)
                            .then(
                                () => {
                                    fs.unlink(zip.path, (err => {
                                        if (err) { logger.error(err.message) }
                                        else {
                                            logger.info("Successfully deleted file: " + zip.filename)
                                        }
                                    }));
                                }
                            );
                    })
                }


                res.status(200).json({
                    "success": true,
                    "message": "File(s) uploaded successfully."
                });

            } else {
                res.status(400).json({
                    "success": false,
                    "message": "No file(s) uploaded."
                });

            }
        }
    });

}

const unzipFile = async (zipFile: string, destiantion: string) => {
    try {
        const readStream = fs.createReadStream(zipFile);
        const writeStream = unzipper.Extract({ path: destiantion });

        readStream.pipe(writeStream);

        writeStream.on('close', () => {
            logger.info('File unzipped and saved successfully');
        });
    } catch (error: any) {
        logger.error('Error unzipping the file:', error.message);
    }
}
