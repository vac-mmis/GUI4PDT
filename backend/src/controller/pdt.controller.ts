import { Request, Response } from "express";

import PDTStore from "@/store/pdt.store";

const pdtController = {
    getAllPDT,
};

function getAllPDT(req: Request, res: Response) {
    res.status(200).json(PDTStore.get()[0]);
}

export default pdtController;
