import Plotly from "plotly.js-dist-min";
import fs from "fs";
import path from "path";
import { PDTObject } from "../models/object.model";
import { loadModels } from "../services/models.services";
import { ObjectJSONType } from "../types/object.types";

const MODELPATH = `models`;
export default class PDT {
    name: string;
    PDTDir: string;
    models?: Partial<Plotly.Data>[];
    objects: PDTObject[];
    bottomTexture?: Partial<Plotly.Data>;
    depthMap?: Partial<Plotly.Data>;
    temperature?: Partial<Plotly.Data>;
    currents?: Partial<Plotly.Data>;

    constructor(PDTFile: string) {
        this.PDTDir = path.dirname(path.resolve("wwwroot", "data", PDTFile)).normalize();
        this.name = path.basename(PDTFile, ".json");
        const jsonData = JSON.parse(fs.readFileSync(`${this.PDTDir}/${this.name}.json`, "utf-8"));
        if (jsonData === undefined) {
            throw new Error("JSON Data undefined");
        }

        this.name = jsonData.name;
        this.objects = [];
        if (jsonData.objects !== undefined) {
            jsonData.objects.forEach((obj: ObjectJSONType) => {
                this.objects.push(new PDTObject(obj));
            });
        } else {
            console.error("jsonData has no objects");
        }
    }

    public async init() {
        const modelPath = `${this.PDTDir}/${MODELPATH}`;
        await loadModels(modelPath, fs.readdirSync(modelPath))
            .then((models) => {
                this.models = models;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
