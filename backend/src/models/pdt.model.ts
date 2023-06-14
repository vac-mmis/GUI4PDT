import { PlotData } from "plotly.js-dist-min";
import fs from "fs";
import path from "path";
import PDTObject from "../models/object.model";
import { loadModels } from "../services/models.services";
import { ObjectJSONType } from "../types/object.types";

const MODELPATH = `models`;

export default class PDT {
    name: string;
    jsonData?: any;
    PDTDir: string;
    models?: Partial<PlotData>[];
    objects: PDTObject[];
    bottomTexture?: Partial<PlotData>;
    depthMap?: Partial<PlotData>;
    temperature?: Partial<PlotData>;
    currents?: Partial<PlotData>;

    constructor(PDTFile: string) {
        this.PDTDir = path.dirname(path.resolve("wwwroot", "data", PDTFile)).normalize();
        this.name = path.basename(PDTFile, ".json");
        this.jsonData = JSON.parse(fs.readFileSync(`${this.PDTDir}/${this.name}.json`, "utf-8"));
        if (this.jsonData === undefined) {
            throw new Error("JSON Data undefined");
        }

        this.name = this.jsonData.name;
        this.objects = [];
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
        if (this.jsonData.objects !== undefined) {
            this.jsonData.objects.forEach((obj: ObjectJSONType) => {
                this.objects.push(new PDTObject(obj, this.models));
            });
        } else {
            console.error("jsonData has no objects");
        }
    }
}
