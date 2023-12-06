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
import fs from "fs";

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
        .then(() => {

            interface SaveData {
                models: Record<string, any>; 
                materials: Record<string, any>; 
                pdts: Record<string, any>; 
              }
            

            const models = ModelStore.get(); // get all models
            const materials = MaterialStore.get(); // get all materials
            const pdts = PDTStore.get(); // get all pdts

            const saveData:SaveData = {
                "models": models,
                "materials": materials,
                "pdts": pdts
            }
            

            fs.writeFile('../frontend/saveData.json', JSON.stringify(saveData), (err) => {
                if (err) throw err;
                logger.info('All data has been saved into a file: frontend/saveData.json');
            });

        }).catch((err) => logger.error(err));
};

setup();

export * as Router from "@/routes";
export * as Models from "@/models";
export * as Controllers from "@/controllers";
export * as Stores from "@/store";
export * as Types from "@/types";
