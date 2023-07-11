import express from "express";

import pdtRouter from "@/routes/pdt.route";

const router = express.Router();

router.use(pdtRouter);

export default router;
