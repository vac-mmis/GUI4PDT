import { readdir } from "fs/promises";
import PDT from "../models/pdt.model";
import { lstatSync } from "fs";

const dataPath = `${__dirname}/../../data`;
const PDTs: PDT[] = [];

const init = async () => {
    readdir(dataPath).then((folders) =>
        folders.map(async (folder) => {
            const folderPath = `${dataPath}/${folder}`;
            const files = await readdir(folderPath);
            return files
                .filter((file) => !lstatSync(`${folderPath}/${file}`).isDirectory())
                .map((file) => {
                    const pdt = new PDT(`${folderPath}/${file}`);
                    PDTs.push(pdt);
                });
        })
    );
};

const get = () => {
    return PDTs;
};

export default {
    init,
    get,
};
