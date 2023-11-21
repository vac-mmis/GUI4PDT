/**
 * List all available routes for PDTs
 *
 * @module pdt.route
 */
import express from "express";

import * as uploadController from "@/controllers/upload.controller";



/**
 * All routes dedicated to serve PDTs. Creating a new route for these objects should be added here with its route controller
 */
export const uploadRoute = express
    .Router()
    .post("/upload", uploadController.uploadFiles);

