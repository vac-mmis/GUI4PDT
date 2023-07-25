/**
 * List all available routes for models
 *
 * @module model.route
 */
import express from "express";

import * as modelController from "@/controllers/model.controller";

/**
 * All routes dedicated to serve models. Creating a new route for these objects should be added here with its route controller
 */
export const modelRoute = express
    .Router()
    .get("/models", modelController.getModels)
    .get("/model/:name", modelController.findModelByName);
