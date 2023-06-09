import { readdir } from "fs/promises";
import PDT from "../models/pdt.model";

const dataPath = `${__dirname}/../../data`;
const PDTs: PDT[] = [];

const init = async () => {
    await readdir(dataPath).then((folders) => {
        folders.forEach(async (folder) => {
            const files = await readdir(`${dataPath}/${folder}`);
            const pdt = new PDT(`${dataPath}/${folder}/${files[1]}`);
            await pdt.init();
            PDTs.push(pdt);
        });
    });
};

const get = () => {
    return PDTs;
};
export default {
    init,
    get,
};
