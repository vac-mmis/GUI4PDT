/**
 * Express.JS controllers for PDTs
 *
 * @module pdt.controller
 */

import { Request, Response } from "express";

import * as PDTStore from "@/store/pdt.store";

/**
 * Get available PDT names
 * @param req Unused here
 * @param res HTTP Response :
 * - 200 confirmation + PDT names sorted by alphabetic ascending order
 */
export function getPDTList(req: Request, res: Response) {
    res.status(200).json(PDTStore.list().sort((a, b) => a.localeCompare(b)));
}

/**
 * Get PDT by name
 * @param req HTTP Request. Must have `name` attribute with the desired PDT
 * @param res HTTP Response :
 * - 200 confirmation + requested PDT
 * - 404 error if desired PDT doesn't exist
 */
export function findPDTByName(req: Request, res: Response) {
    const pdt = PDTStore.find(req.params.name);
    if (!pdt) {
        res.status(404).json("Model not found");
    } else {
        res.status(200).json(pdt.getPublicPDT());
    }
}
