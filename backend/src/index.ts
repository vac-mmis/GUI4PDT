/**
 * This is the main code oh this ExpressJS backend application. It setups all the application : port number, modules, ressources loading and server initialization
 *
 * @module index
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import { router } from "@/routes";
import { PDTStore, ModelStore, MaterialStore } from "@/store";

import { logger } from "@/utils/logger";

const port = process.env.PORT ?? 3000;
const app = express();
app.use(cors())
    .use(bodyParser.json({ limit: "50mb" }))
    .use("/api", router);

/**
 * This async setup function loads all necessary folders to serve PDTs and starts Express.JS server
 */
const setup = async () => {
    logger.info(`Backend starting...`);
    await ModelStore.load()
        .then(() => MaterialStore.load())
        .then(() => PDTStore.load())
        .then(() =>
            app.listen(port, () => {
                logger.info(`Backend started successfully! Server listen on port ${port}`);
            })
        )
        .catch((err) => logger.error(err));
};

setup();

export * as Router from "@/routes";
export * as Models from "@/models";
export * as Controllers from "@/controllers";
export * as Stores from "@/store";
export * as Types from "@/types";
