import { PlotData } from "plotly.js-dist-min";
import fs from "fs";
import path from "path";
import { loadModels } from "../services/models.services";
import { ObjectJSONType } from "../types/object.types";

const MODELPATH = `models`;

export default class PDT {
    name: string;
    PDTDir: string;
    models?: Partial<PlotData>[];
    objects: ObjectJSONType[];
    bottomTexture?: Partial<PlotData>;
    depthMap?: Partial<PlotData>;
    temperature?: Partial<PlotData>;
    currents?: Partial<PlotData>;
    constructor(PDTFile: string) {
        this.PDTDir = path.dirname(path.resolve("wwwroot", "data", PDTFile)).normalize();
        this.name = path.basename(PDTFile, ".json");
        const json = JSON.parse(fs.readFileSync(`${this.PDTDir}/${this.name}.json`, "utf-8"));
        if (json === undefined) {
            throw new Error("JSON Data undefined");
        }

        this.name = json.name;
        this.objects = json.objects;
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
