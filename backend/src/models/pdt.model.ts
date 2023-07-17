import { readFile, readdir, stat } from "fs/promises";
import path from "path";

import { ObjectJSON, ObjectTimestamp } from "@/types/object.types";
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

const timestampsToPDTJSON = async (pdtFiles: string[]) => {
    const JSONData = await Promise.all(
        pdtFiles.map(async (file) => {
            const json = JSON.parse(await readFile(file, { encoding: "utf8" }));
            if (json === undefined) {
                throw new Error("JSON Data undefined");
            }
            return json;
        })
    );

    const res = { objects: [] as Array<ObjectJSON> };
    JSONData.forEach((pdtTimestamp: { timestep: number; objects: ObjectTimestamp[] }) => {
        pdtTimestamp.objects.forEach((object) => {
            const i = pdtTimestamp.timestep;
            const resObject = res.objects.find((obj) => obj.id === object.id);
            if (!resObject) {
                res.objects[object.id] = {
                    id: object.id,
                    class: [],
                    location: [],
                    material: [],
                    rotation: [],
                    scale: [],
                    physics: [],
                } as ObjectJSON;
            }
            res.objects[object.id].class[i] = object.class;
            res.objects[object.id].location[i] = object.location;
            res.objects[object.id].material[i] = object.material;
            res.objects[object.id].rotation[i] = object.rotation;
            res.objects[object.id].scale[i] = object.scale;
            res.objects[object.id].physics[i] = object.physics;
        });
    });
    return res;
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
        const timestamps = (await readdir(this.PDTDir))
            .filter((file) => file.split(".json")[0] !== file)
            .map((file) => `${this.PDTDir}/${file}`);
        const json = await timestampsToPDTJSON(timestamps);

        this.name = path.basename(this.PDTDir, ".json");
        this.objects = json.objects;
        this.models = await serializeModels(this.PDTDir);
        this.materials = await serializeMaterials(this.PDTDir);
    }

    public getPublicData(): Partial<PDT> {
        const { name, models, materials, objects } = this;
        return { name, models, materials, objects };
    }
}
export default PDT;
