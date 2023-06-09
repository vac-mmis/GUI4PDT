import { Request, Response } from "express";
import PDTServices from "../services/pdt.services";

const pdtController = {
    getAllPDT,
};

async function getAllPDT(req: Request, res: Response) {
    res.status(200).json(PDTServices.get()[0]);
}

export default pdtController;
