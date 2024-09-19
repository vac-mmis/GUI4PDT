/**
 * Express.JS controllers for PDTs
 *
 * @module uploadcsv.controller
 */

import { Request, Response } from "express";

import { logger } from "@/utils/logger";
import multer from "multer";
import path from "path";
import fs from "fs";

const pdtPath = path.resolve(process.env.DATA ?? "").normalize();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const projectName = req.body.projectName;
        const projectPath = path.join(pdtPath, projectName).toString();
        if (!fs.existsSync(projectPath)) {
            cb(new Error("Can't add csv. No project selected."), "");
        }

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

/**
 * Insert a CSV file into an existing project
 *
 * @param req file attribute which contains the csv file. The structure is:
 * - fieldname: 'csvFile'
 * - originalname: 'example.csv'
 * - encoding: '7bit'
 * - mimetype: 'text/csv'
 * - destination: 'C:\\Users\\User\\example\\demo_pdt'
 * - filename: 'example.csv'
 * - path: 'C:\\Users\\User\\project\\demo_pdt'
 * - size: 5759
 * @param res HTTP Response :
 * - 200 confirmation + project was created
 * - 400 error writing the file or project already exists
 */
export function uploadCSV(req: Request, res: Response): void {
    multerUploadMulti(req, res, (err) => {
        if (err) {
            logger.error(err, err.message);

            res.status(500).json({
                success: false,
                message: err.message,
            });
        } else {
            //Here you can decide, what to do with the uploaded file
            //currentFile is the file that gets uploaded

            //const currentFile = req.file; (uncomment to use)

            //You can use the current fields of 'currentFile':
            // {
            //     fieldname: 'csvFile',
            //     originalname: 'example.csv',
            //     encoding: '7bit',
            //     mimetype: 'text/csv',
            //     destination: 'C:\\Users\\User\\example\\demo_pdt',
            //     filename: 'example.csv',
            //     path: 'C:\\Users\\User\\project\\demo_pdt',
            //     size: 5759
            //   }

            res.status(200).json({
                success: true,
                message: "File(s) uploaded successfully.",
            });
        }
    });
}
