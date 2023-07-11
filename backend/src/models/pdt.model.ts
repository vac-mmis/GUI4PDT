import { readFile, readdir, stat } from "fs/promises";
import path from "path";

import { ObjectJSON } from "@/types/object.types";
import { MaterialFile, ModelFile } from "@/types/file.types";

const MODELPATH = `models`;
const MATERIALPATH = `materials`;

const serializeModels = async (pdtPath: string) => {
    const modelPath = `${pdtPath}/${MODELPATH}`;
    return await readdir(modelPath)
        .then((modelFiles) =>
            Promise.all(
                modelFiles
                    .map(async (file: string) => {
                        const filePath = path.join(modelPath, file);
                        const fileStat = await stat(filePath);

                        if (fileStat.isFile()) {
                            const fileData = await readFile(filePath);
                            return { name: file, content: fileData.toString("base64") };
                        }
                    })
                    .filter((modelFile): modelFile is Promise<ModelFile> => modelFile !== undefined)
            )
        )
        .catch((err) => {
            console.error(err);
            return [];
        });
};

const serializeMaterial = async (materialPath: string) => {
    let material = {} as MaterialFile;
    const materialFiles = await readdir(materialPath);
    material.name = path.basename(materialPath);
    await Promise.all(
        materialFiles.map(async (fileName) => {
            const filePath = path.join(materialPath, fileName);
            const attribute = fileName.split("_").slice(-1)[0].split(".")[0] as keyof MaterialFile;
            const fileData = await readFile(filePath);
            material[attribute] = fileData.toString("base64");
        })
    );
    return material;
};

const serializeMaterials = async (pdtPath: string) => {
    const materialsPath = `${pdtPath}/${MATERIALPATH}`;
    return await readdir(materialsPath)
        .then((materialFolders) =>
            Promise.all(
                materialFolders
                    .map(async (materialFolder: string) =>
                        serializeMaterial(path.join(materialsPath, materialFolder))
                    )
                    .filter(
                        (modelFile): modelFile is Promise<MaterialFile> => modelFile !== undefined
                    )
            )
        )
        .catch((err) => {
            console.error(err);
            return [];
        });
};

class PDT {
    name!: string;
    private PDTDir: string;
    models?: ModelFile[];
    materials?: MaterialFile[];
    objects!: ObjectJSON[];
    bottomTexture?: any;
    depthMap?: any;
    temperature?: any;
    currents?: any;

    constructor(PDTFile: string) {
        this.PDTDir = path.resolve("data", PDTFile).normalize();
    }

    public async init() {
        const pdtFiles = await readdir(this.PDTDir);
        this.name = pdtFiles.filter((file) => file.split(".json")[0] !== file)[0];
        const jsonFile = await readFile(`${this.PDTDir}/${this.name}`, { encoding: "utf8" });
        const json = JSON.parse(jsonFile);
        if (json === undefined) {
            throw new Error("JSON Data undefined");
        }

        this.name = json.name;
        this.objects = json.objects;
        this.models = await serializeModels(this.PDTDir);
        this.materials = await serializeMaterials(this.PDTDir);
    }
}
export default PDT;
