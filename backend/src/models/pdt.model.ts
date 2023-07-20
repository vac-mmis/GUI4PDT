import { readFile, readdir } from "fs/promises";
import path from "path";

import type { ObjectJSON, ObjectTimestamp } from "@/types/object.types";

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

    const res = { name: JSONData[0].name, objects: [] as Array<ObjectJSON> };
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
    objects!: ObjectJSON[];
    bottomTexture?: any;
    depthMap?: any;
    temperature?: any;
    currents?: any;

    constructor(PDTDir: string) {
        this.PDTDir = path.resolve("data", PDTDir).normalize();
    }

    public async init() {
        const timestamps = (await readdir(this.PDTDir))
            .filter((file) => file.split(".json")[0] !== file)
            .map((file) => `${this.PDTDir}/${file}`);
        const json = await timestampsToPDTJSON(timestamps);

        this.name = json.name || path.basename(this.PDTDir);
        this.objects = json.objects;
    }

    public getPublicData(): Partial<PDT> {
        const { name, objects } = this;
        return { name, objects };
    }

    public getName = (): string => this.name;
}
export default PDT;
