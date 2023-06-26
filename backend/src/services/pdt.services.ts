import { readdir } from "fs/promises";
import PDT from "../models/pdt.model";
import { lstatSync, stat } from "fs";

const dataPath = `${__dirname}/../../data`;
const PDTs: PDT[] = [];

const init = async () => {
    await readdir(dataPath).then((folders) =>
        Promise.all(
            folders.map(async (folder) => {
                const folderPath = `${dataPath}/${folder}`;
                return await readdir(folderPath).then((files) =>
                    files
                        .filter((file) => !lstatSync(`${folderPath}/${file}`).isDirectory())
                        .map(async (file) => {
                            const pdt = new PDT(`${folderPath}/${file}`);
                            await pdt.init();
                            PDTs.push(pdt);
                        })
                );
            })
        )
    );
};

const get = () => {
    return PDTs;
};
export default {
    init,
    get,
};
