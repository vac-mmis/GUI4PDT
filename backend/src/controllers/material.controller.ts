/**
 * Express.JS controllers for models
 *
 * @namespace material.controller
 */

import { Request, Response } from "express";

import * as MaterialStore from "@/store/material.store";

/**
 * Get available materials
 * @param req Unused here
 * @param res HTTP Response :
 * - 200 confirmation + available materials
 */
export function getMaterials(req: Request, res: Response) {
    res.status(200).json(MaterialStore.get());
}

/**
 * Get material by name
 * @param req HTTP Request. Must have `name` attribute with the desired material
 * @param res HTTP Response :
 * - 200 confirmation + requested material
 * - 404 error if desired material doesn't exist
 */
export function findMaterialByName(req: Request, res: Response) {
    const material = MaterialStore.find(req.params.name);
    if (!material) {
        res.status(404).json("Material not found");
    } else {
        res.status(200).json(material);
    }
}
