/**
 * List all available routes for PDTs
 *
 * @module pdt.route
 */
import express from "express";

import * as pdtController from "@/controllers/pdt.controller";

/**
 * All routes dedicated to serve PDTs. Creating a new route for these objects should be added here with its route controller
 */
export const PDTRoute = express
    .Router()
    .get("/pdts/list", pdtController.getPDTList)
    .get("/pdt/:name", pdtController.findPDTByName);
