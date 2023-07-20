import { readFile, readdir } from "fs/promises";
import path from "path";

const materialsPath = path.resolve("assets", `materials`).normalize();

export type MaterialFile = {
    name: string;
    albedo: string;
    ao: string;
    metalness: string;
    normal: string;
    roughness: string;
};

const materials: MaterialFile[] = [];

const serializeMaterial = async (materialPath: string): Promise<MaterialFile> => {
    const materialFiles = await readdir(materialPath);
    const material = {} as MaterialFile;
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

const load = async (): Promise<void> => {
    await readdir(materialsPath)
        .then((materialFolders) =>
            Promise.all(
                materialFolders.map(async (materialFolder: string) =>
                    materials.push(
                        await serializeMaterial(path.join(materialsPath, materialFolder))
                    )
                )
            )
        )
        .catch((err) => {
            throw new Error(`Materials loading failed : ${err}`);
        });
};

const get = (): MaterialFile[] => materials;

const find = (name: string) => materials.find((material) => material.name === name);

export default {
    load,
    get,
    find,
};
