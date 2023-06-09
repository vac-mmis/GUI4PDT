import express from "express";
import pdtController from "../controller/pdt.controller";

const router = express.Router();

router.get("/", pdtController.getAllUtilisateurs);

export default router;
