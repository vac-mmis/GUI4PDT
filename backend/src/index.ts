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
import { Server } from "socket.io";
import chokidar from "chokidar";
import path from "path";
import fs, { readdir } from "fs";



const port = process.env.PORT ?? 3000;
const app = express();

const server = http.createServer(app)
const io = new Server(server, { transports: ['websocket'] });

const pdtsPath = path.resolve(process.env.DATA ?? "").normalize();
const modelsPath = path.resolve(process.env.MODELS ?? "").normalize();
const materialsPath = path.resolve(process.env.MATERIALS ?? "").normalize();

const watcherModels = chokidar.watch(modelsPath, {
  ignored: /(^|[/\\])\../,
  persistent: true,
});
const watcherPDT = chokidar.watch(pdtsPath, {
  ignored: /(^|[/\\])\../, 
  persistent: true,
});
const watcherMaterials = chokidar.watch(materialsPath, {
  ignored: /(^|[/\\])\../, 
  persistent: true,
});

//TODO websockets
io.on('connection', (socket) => {
  console.log('Client connected');
  io.emit("new pdt", "OK");
  io.emit("new material", "OK");
  io.emit("new model", "OK");


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


app.use(cors(
  {
    origin: 'http://localhost:5173', // Ersetze dies durch den tatsächlichen Ursprung deiner Vue.js-App
    methods: ['GET', 'POST'],
  }
)).use(bodyParser.json({ limit: "50mb" }))
  .use("/api", router);


/**
 * This async reloadProjectNames function checks the PDT directory and adapts the name inside the PDT definition for each file according to the project folder name
 */
const reloadProjectNames = async () => {
  const dirs = await fs.promises.readdir(pdtsPath);

  try {

    dirs.forEach(async (dir) => {
      const projectPath = path.join(pdtsPath, dir);
      const projectName = dir;

      const files = await fs.promises.readdir(projectPath);

      files.forEach((file) => {

        const filePath = path.join(projectPath, file);
        if (path.extname(file) === ".json") {

          // Read the JSON file
          const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8') === "" ? "{}" : fs.readFileSync(filePath, 'utf-8'));

          // Check if the JSON has a 'name' attribute
          if (jsonData.hasOwnProperty('name')) {
            // Update the 'name' attribute
            jsonData.name = projectName;

            // Write the updated JSON back to the file
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
          }

        }

      });
    });

  } catch (error: any) {
    logger.error(error, error.message)
  }


}


/**
 * This async setup function loads all necessary folders to serve PDTs and starts Express.JS server
 */
const setup = async () => {

  logger.info(`Backend starting...`);

  //TODO start watching files and updating also messaging the client vie websoicket
  let isProcessingMat = false;
  let isProcessingMod = false;
  let isProcessingPDT = false;

  watcherMaterials.on("all" || "add", async () => {
    if (!isProcessingMat) {
      isProcessingMat = true;
      await MaterialStore.load().catch((err) => logger.error(err, err.message));
      io.emit("new material");
      isProcessingMat = false;
    }
  });
  watcherModels.on("all" || "add", async () => {
    if (!isProcessingMod) {
      isProcessingMod = true;
      await ModelStore.load().catch((err) => logger.error(err, err.message));
      io.emit("new model");
      isProcessingMod = false;
    }
  });

  watcherPDT.on("all", async () => {
    if (!isProcessingPDT) {
      isProcessingPDT = true;
      await reloadProjectNames();
      try {
        await PDTStore.load()
        io.emit("new pdt");
      } catch (err: any) {
        logger.error(err, err.message)

      }

      isProcessingPDT = false;

    }
  });



  server.listen(port, () => {
    logger.info(`Backend started successfully! Server listen on port ${port}`);
  });



};

setup();

export * as Router from "@/routes";
export * as Models from "@/models";
export * as Controllers from "@/controllers";
export * as Stores from "@/store";
export * as Types from "@/types";
