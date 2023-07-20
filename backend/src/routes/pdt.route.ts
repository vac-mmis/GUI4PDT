import express from "express";

import pdtController from "@/controller/pdt.controller";

const router = express.Router();

router.get("/pdts/list", pdtController.getPDTList);
router.get("/pdt/:name", pdtController.findPDTByName);

export default router;
