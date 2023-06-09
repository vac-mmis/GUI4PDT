import Plotly from "plotly.js-dist-min";
import fs from "fs";
import OBJServices from "../services/object.services";
import type { PDTObjectType } from "../types/object.types";

export default class PDT {
    name: string;
    models?: Partial<Plotly.Data>[];
    objects: Partial<Plotly.Data>[];
    bottomTexture?: Partial<Plotly.Data>;
    depthMap?: Partial<Plotly.Data>;
    temperature?: Partial<Plotly.Data>;
    currents?: Partial<Plotly.Data>;

    constructor(PDTPath: string) {
        const jsonData = JSON.parse(fs.readFileSync(PDTPath, "utf-8"));

        // if (jsonData === undefined) {
        //     throw new Error("JSON Data undefined");
        // }
        this.name = jsonData.name;
        this.objects = [];
        if (jsonData.objects !== undefined) {
            jsonData.objects.forEach((obj: PDTObjectType) => {
                this.objects.push(OBJServices.toData(obj));
            });
        } else {
            console.log("here");
        }
    }

    public async init() {
        // await loadModels(this.filePath)
        //     .then((models) => {
        //         this.models = models;
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }
}
