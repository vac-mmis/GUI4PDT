import express from "express";
import pdtRouter from "./pdt.route";

const router = express.Router();

router.use(pdtRouter);

export default router;
