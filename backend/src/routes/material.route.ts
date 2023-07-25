/**
 * List all available routes for materials
 *
 * @module material.route
 */
import express from "express";

import * as materialController from "@/controllers/material.controller";

/**
 * All routes dedicated to serve materials. Creating a new route for these objects should be added here with its route controller
 */
export const materialRoute = express
    .Router()
    .get("/materials", materialController.getMaterials)
    .get("/material/name", materialController.findMaterialByName);
