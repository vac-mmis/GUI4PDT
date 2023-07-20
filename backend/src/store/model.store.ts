import { readFile, readdir, stat } from "fs/promises";
import path from "path";

const modelPath = path.resolve("assets", `models`).normalize();

export type ModelFile = {
    name: string;
    content: string;
};

const models: ModelFile[] = [];

const load = async (): Promise<void> => {
    await readdir(modelPath)
        .then((modelFiles) =>
            Promise.all(
                modelFiles.map(async (file: string) => {
                    const filePath = path.join(modelPath, file);
                    const fileStat = await stat(filePath);
                    if (fileStat.isFile()) {
                        const fileData = await readFile(filePath);
                        models.push({
                            name: path.basename(file, path.extname(file)).toLowerCase(),
                            content: fileData.toString("base64"),
                        });
                    }
                })
            )
        )
        .catch((err) => {
            throw new Error(`Models loading failed : ${err}`);
        });
};

const get = (): ModelFile[] => models;

const find = (name: string) => models.find((model) => model.name === name);

export default {
    load,
    get,
    find,
};
