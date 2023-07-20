import express from "express";

import pdtRouter from "@/routes/pdt.route";
import modelRouter from "@/routes/model.route";
import materialRouter from "@/routes/material.route";

const router = express.Router();

router.use("/", pdtRouter, modelRouter, materialRouter);

export default router;
