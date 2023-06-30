import fs from "fs";
import path from "path";
import { ObjectJSON } from "../types/object.types";

const MODELPATH = `models`;

export default class PDT {
    name: string;
    private PDTDir: string;
    models?: { name: string; content: string }[];
    objects: ObjectJSON[];
    bottomTexture?: any;
    depthMap?: any;
    temperature?: any;
    currents?: any;

    constructor(PDTFile: string) {
        this.PDTDir = path.dirname(path.resolve("wwwroot", "data", PDTFile)).normalize();
        this.name = path.basename(PDTFile, ".json");
        const json = JSON.parse(fs.readFileSync(`${this.PDTDir}/${this.name}.json`, "utf-8"));
        if (json === undefined) {
            throw new Error("JSON Data undefined");
        }

        this.name = json.name;
        this.objects = json.objects;

        const modelPath = `${this.PDTDir}/${MODELPATH}`;
        fs.readdir(modelPath, (err, files) => {
            if (err) {
                console.error("Error reading folder:", err);
            } else {
                const fileContents: { name: string; content: string }[] = [];

                files.forEach((file) => {
                    const filePath = path.join(modelPath, file);
                    const stat = fs.statSync(filePath);

                    if (stat.isFile()) {
                        const fileData = fs.readFileSync(filePath);
                        fileContents.push({ name: file, content: fileData.toString("base64") });
                    }
                });
                this.models = fileContents;
            }
        });
    }
}
