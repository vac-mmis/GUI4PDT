import express from "express";

import materialController from "@/controller/material.controller";

const router = express.Router();

router.get("/materials", materialController.getMaterials);
router.get("/material/name", materialController.findMaterialByName);
export default router;
