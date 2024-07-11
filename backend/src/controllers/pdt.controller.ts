/**
 * Express.JS controllers for PDTs
 *
 * @module pdt.controller
 */

import { Request, Response } from "express";

import * as PDTStore from "@/store/pdt.store";
import { logger } from "@/utils/logger";
import multer from "multer";
import path from "path";

/**
 * Get available PDT names
 * @param req Unused here
 * @param res HTTP Response :
 * - 200 confirmation + PDT names sorted by alphabetic ascending order
 */
export function getPDTList(req: Request, res: Response): void {
    res.status(200).json(PDTStore.list().sort((a, b) => a.localeCompare(b)));
}

/**
 * Get PDT by name
 * @param req HTTP Request. Must have `name` attribute with the desired PDT
 * @param res HTTP Response :
 * - 200 confirmation + requested PDT
 * - 404 error if desired PDT doesn't exist
 */
export function findPDTByName(req: Request, res: Response): void {
    const pdt = PDTStore.find(req.params.name);
    if (!pdt) {
        logger.warn(`Client ${req.ip} requested PDT "${req.params.name}" which is not available`);
        res.status(404).json("PDT not found");
    } else {
        res.status(200).json(pdt.getPublicPDT());
    }
}

