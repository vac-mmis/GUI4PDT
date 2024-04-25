/**
 * Express.JS controllers for PDTs
 *
 * @module upload.controller
 */

import { Request, Response } from "express";

import { logger } from "@/utils/logger";
import multer from "multer";
import path from "path";

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
        const projectName = req.body.projectName;
        const projectPath = path.join(pdtPath, projectName).toString();

        cb(null, projectPath);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename);
    },
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedFileTypes = ["text/csv"];

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
const multerUploadMulti = upload.single("csvFile");

export function uploadCSV(req: Request, res: Response): void {
    multerUploadMulti(req, res, (err) => {
        if (err) {
            logger.error(err, err.message);

            res.status(500).json({
                success: false,
                message: err.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "File(s) uploaded successfully.",
            });
        }
    });
}
