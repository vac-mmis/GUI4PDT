import { readdir } from "fs/promises";

import PDT from "@/models/pdt.model";

const dataPath = `${__dirname}/../../data`;
const PDTs: PDT[] = [];

const init = async () => {
    const pdtDirs = await readdir(dataPath);
    await Promise.all(
        pdtDirs.map(async (PDTDir) => {
            const pdt = new PDT(`${dataPath}/${PDTDir}`);
            await pdt.init();
            PDTs.push(pdt);
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
