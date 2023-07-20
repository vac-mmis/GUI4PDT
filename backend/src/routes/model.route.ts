import express from "express";

import modelController from "@/controller/model.controller";

const router = express.Router();

router.get("/models", modelController.getModels);
router.get("/model/:name", modelController.findModelByName);
export default router;
