/**
 * Express.JS controllers for models
 *
 * @module model.controller
 */

import { Request, Response } from "express";

import * as ModelStore from "@/store/model.store";
import { logger } from "@/utils/logger";

/**
 * Get available models
 * @param req Unused here
 * @param res HTTP Response :
 * - 200 confirmation + available models
 *
 * @module Models
 */
export function getModels(req: Request, res: Response): void {
    res.status(200).json(ModelStore.get());
}

/**
 * Get model by name
 * @param req HTTP Request. Must have `name` attribute with the desired model
 * @param res HTTP Response :
 * - 200 confirmation + requested model
 * - 404 error if desired model doesn't exist
 *
 * @module Models
 */
export function findModelByName(req: Request, res: Response): void {
    const model = ModelStore.find(req.params.name);
    if (!model) {
        logger.warn(`Client ${req.ip} requested model "${req.params.name}" which is not available`);
        res.status(404).json("Model not found");
    } else {
        res.status(200).json(model);
    }
}
