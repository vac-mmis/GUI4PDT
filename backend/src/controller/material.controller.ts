import { Request, Response } from "express";

import materialStore from "@/store/material.store";

function getMaterials(req: Request, res: Response) {
    res.status(200).json(materialStore.get());
}

function findMaterialByName(req: Request, res: Response) {
    const material = materialStore.find(req.params.name);
    if (!material) {
        res.status(404).json("Material not found");
    } else {
        res.status(200).json(material);
    }
}

export default {
    getMaterials,
    findMaterialByName,
};
