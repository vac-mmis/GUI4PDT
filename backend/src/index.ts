/**
 * This is the main code oh this ExpressJS backend application. It setups all the application : port number, modules, ressources loading and server initialization
 *
 * @module index
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { router } from "@/routes/routes";

import * as PDTStore from "@/store/pdt.store";
import * as ModelStore from "@/store/model.store";
import * as MaterialStore from "@/store/material.store";

const port = 3000;
const app = express();
app.use(cors())
    .use(bodyParser.json({ limit: "50mb" }))
    .use("/api", router);

/**
 * This async setup function loads all necessary folders to serve PDTs and starts Express.JS server
 */
const setup = async () => {
    await ModelStore.load()
        .then(() => MaterialStore.load())
        .then(() => PDTStore.load())
        .then(() =>
            app.listen(port, () => {
                console.log(`Express app listening on port ${port}`);
            })
        )
        .catch((err) => console.error(err));
};

setup();

export * as Router from "@/routes/routes";
export * as Models from "@/models/model";
export * as Controllers from "@/controllers/controllers";
export * as Stores from "@/store/store";
export * as Types from "@/types/types";
