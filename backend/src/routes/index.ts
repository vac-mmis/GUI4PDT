/**
 * Provides all available routes
 *
 * To add a new route to this API, please follows this instructions :
 * 1. Choose a relevant route for serving your controller. You can follow {@link https://restfulapi.net/resource-naming/ | this guide} to write them well.
 * 2. Determine what request method do you need (GET, POST, PUT, DELETE...).
 * 3. Create a new controller in {@link Controllers} to handle your request and serve your desired response. If it concerns an model or a store which already exists, please just add it in the dedicated controller module. For example, a new route for PDT should have its controller in {@link Router}.
 * 4. Add this route in the relevant route module. To keep the previous example, a new route for PDT should be in `src/routes/pdt.route.ts`. If this route needs a new route submodules, it should be added in the `router` const in this module.
 *
 * @see {@link https://expressjs.com/en/4x/api.html#app | Express.JS Request}
 * @module routes
 */
import express from "express";

import { PDTRoute } from "@/routes/pdt.route";
import { modelRoute } from "@/routes/model.route";
import { materialRoute } from "@/routes/material.route";
import { uploadRoute } from "@/routes/upload.route";

/**
 * Main route which assemble all others. Any new submodule route should be imported and added here
 */
export const router = express.Router().use("/", PDTRoute, modelRoute, materialRoute,uploadRoute);
