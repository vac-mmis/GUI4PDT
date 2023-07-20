import { Request, Response } from "express";

import PDTStore from "@/store/pdt.store";

function getPDTList(req: Request, res: Response) {
    res.status(200).json(PDTStore.list().sort((a, b) => a.localeCompare(b)));
}

function findPDTByName(req: Request, res: Response) {
    const pdt = PDTStore.find(req.params.name);
    if (!pdt) {
        res.status(404).json("Model not found");
    } else {
        res.status(200).json(pdt.getPublicData());
    }
}

export default {
    findPDTByName,
    getPDTList,
};
