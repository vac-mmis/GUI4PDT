import { readdir, stat } from "fs/promises";

import PDT from "@/models/pdt.model";

const dataPath = `${__dirname}/../../data`;
const PDTs: PDT[] = [];

const load = async (): Promise<void> => {
    const pdtDirs = await readdir(dataPath);
    await Promise.all(
        pdtDirs.map(async (PDTDir) => {
            const fileStat = await stat(`${dataPath}/${PDTDir}`);
            if (fileStat.isDirectory()) {
                const pdt = new PDT(`${dataPath}/${PDTDir}`);
                await pdt.init();
                PDTs.push(pdt);
            }
        })
    ).catch((err) => {
        throw new Error(`PDTs loading failed : ${err}`);
    });
};

const get = (): Partial<PDT>[] => PDTs.map((pdt) => pdt.getPublicData());

const list = (): string[] => PDTs.map((pdt) => pdt.getName());

const find = (name: string): PDT | undefined => PDTs.find((pdt: PDT) => pdt.name === name);

export default {
    load,
    get,
    list,
    find,
};
