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

import http from "http";
import WebSocket from "ws";

import { debounce } from "lodash";
import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import { checkDirectory } from "./utils/files";

const port = process.env.PORT ?? 3000;

const wsPort = process.env.WS_PORT ?? 3030;
const wsAddress = process.env.WS_ADDRESS ?? "localhost";

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ port: wsPort as number, host: wsAddress });

const pdtsPath = path.resolve(process.env.DATA ?? "").normalize();
const modelsPath = path.resolve(process.env.MODELS ?? "").normalize();
const materialsPath = path.resolve(process.env.MATERIALS ?? "").normalize();

/**
 * Initializing file watching that notices if the data has changed
 */
const watcherModels = chokidar.watch(modelsPath, {
    ignored: /(^|[/\\])\../,
    persistent: true,
});
const watcherPDT = chokidar.watch(pdtsPath, {
    ignored: /(^|[/\\])\../,
    persistent: true,
    usePolling: true,
    interval: 500,
});
const watcherMaterials = chokidar.watch(materialsPath, {
    ignored: /(^|[/\\])\../,
    persistent: true,
});

/**
 * Send a message to the client to reload the pdt if the model or material has changed and has already been reloaded
 */
wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    ws.on("message", (data: Buffer, isBinary: boolean) => {
        if (!isBinary) {
            const message = data.toString();
            const dataObject = JSON.parse(message);

            if (dataObject.object === "pdt" && dataObject.name === null) {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(dataObject));
                    }
                });
            }
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

/**
 * Init the server with configuration
 */
app.use(
    cors({
        origin: process.env.CORS_ORIGIN_DOCKER || "http://localhost:5173", // Ersetze dies durch den tatsächlichen Ursprung deiner Vue.js-App
        methods: ["GET", "POST"],
    })
)
    .use(bodyParser.json({ limit: "50mb" }))
    .use("/api", router);

// /**
//  * This async reloadProjectNames function checks the PDT directory and adapts the name inside the PDT definition for each file according to the project folder name
//  */
// const reloadProjectNames = async () => {
//     const dirs = await fs.promises.readdir(pdtsPath);

//     try {
//         dirs.forEach(async (dir) => {
//             const projectPath = path.join(pdtsPath, dir);
//             const projectName = dir;

//             const files = await fs.promises.readdir(projectPath);

//             files.forEach((file) => {
//                 const filePath = path.join(projectPath, file);
//                 if (path.extname(file) === ".json") {
//                     const jsonData = JSON.parse(
//                         fs.readFileSync(filePath, "utf-8") === ""
//                             ? "{}"
//                             : fs.readFileSync(filePath, "utf-8")
//                     );
//                     // eslint-disable-next-line no-prototype-builtins
//                     if (jsonData.hasOwnProperty("name")) {
//                         jsonData.name = projectName;
//                         fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
//                     }
//                 }
//             });
//         });
//     } catch (error) {
//         logger.error(error);
//     }
// };

/**
 * This async setup function loads all necessary folders to serve PDTs and starts Express.JS server
 */
const setup = async () => {
    logger.info(`Backend starting...`);

    let isProcessingMat = false;
    let isProcessingMod = false;
    let isProcessingPDT = false;

    await MaterialStore.load()
        .catch((err) => logger.error(err, err.message))
        .then(() => ModelStore.load().catch((err) => logger.error(err, err.message)))
        //.then(() => reloadProjectNames())
        .then(() => PDTStore.load().catch((err) => logger.error(err, err.message)))
        .then(() => {
            const models = ModelStore.get();
            const materials = MaterialStore.get();
            const pdts = PDTStore.get();

            const saveData: unknown = {
                models: models,
                materials: materials,
                pdts: pdts,
            };
            fs.writeFile("static_mode/backend_data.json", JSON.stringify(saveData), (err) => {
                if (err) throw err;
                logger.info("All data has been saved into a file: static_mode/backend_data.json");
            });
        });

    /**
     * Send a message to the client via websockets when the data has changed.
     * Use lodash's debounce(), to minimize multiple calls.
     */
    const debounceMaterialsUpdate = debounce(
        async () => {
            if (!isProcessingMat) {
                isProcessingMat = true;
                await MaterialStore.load().catch((err) => logger.error(err, err.message));
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        const pdtMessage = {
                            object: "material",
                            event: null,
                            name: null,
                            isDirectory: null,
                        };
                        client.send(JSON.stringify(pdtMessage));
                    }
                });
                isProcessingMat = false;
            }
        },
        500,
        { maxWait: 3000, trailing: true }
    );

    const debounceModelsUpdate = debounce(
        async () => {
            if (!isProcessingMod) {
                isProcessingMod = true;
                await ModelStore.load().catch((err) => logger.error(err, err.message));
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        const pdtMessage = {
                            object: "model",
                            event: null,
                            name: null,
                            isDirectory: null,
                        };
                        client.send(JSON.stringify(pdtMessage));
                    }
                });
                isProcessingMod = false;
            }
        },
        500,
        { maxWait: 3000, trailing: true }
    );

    const debouncePDTUpdate = debounce(
        async (eventType, fileName) => {
            const pdtName = path.basename(path.dirname(fileName));
            const eventName = eventType;

            const isDirectory = await checkDirectory(fileName);

            if (hasLockFile(path.dirname(fileName))) {
                return;
            }

            if (!isProcessingPDT) {
                isProcessingPDT = true;

                try {
                    await PDTStore.load();
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            const pdtMessage = {
                                object: "pdt",
                                event: eventName,
                                name: pdtName,
                                isDirectory: isDirectory,
                            };
                            client.send(JSON.stringify(pdtMessage));
                        }
                    });
                } catch (err) {
                    logger.error(err);
                }
                isProcessingPDT = false;
            }
        },
        300,
        { maxWait: 3000, trailing: true }
    );

    watcherMaterials.on("all", debounceMaterialsUpdate);
    watcherModels.on("all", debounceModelsUpdate);

    watcherPDT.on("all", (eventType, fileName) => {
        debouncePDTUpdate(eventType, fileName);
    });

    server.listen(port, () => {
        logger.info(`Backend started successfully! Server listen on port ${port}`);
    });
};

function hasLockFile(dir: string) {
    return fs.existsSync(path.join(dir, "lock"));
}

setup();

export * as Router from "@/routes";
export * as Models from "@/models";
export * as Controllers from "@/controllers";
export * as Stores from "@/store";
export * as Types from "@/types";
