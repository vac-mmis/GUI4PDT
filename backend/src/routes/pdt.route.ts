import express from "express";

import pdtController from "@/controller/pdt.controller";

const router = express.Router();

router.get("/", pdtController.getAllPDT);

export default router;
