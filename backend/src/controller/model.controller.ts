import { Request, Response } from "express";

import modelStore from "@/store/model.store";

function getModels(req: Request, res: Response) {
    res.status(200).json(modelStore.get());
}

function findModelByName(req: Request, res: Response) {
    const model = modelStore.find(req.params.name);
    if (!model) {
        res.status(404).json("Model not found");
    } else {
        res.status(200).json(model);
    }
}

export default {
    getModels,
    findModelByName,
};
