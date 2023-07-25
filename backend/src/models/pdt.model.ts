/**
 * Defines PDT class and timestamp conversion.
 *
 * @namespace pdt.model
 */
import { readFile, readdir } from "fs/promises";
import path from "path";

import type { ObjectJSON, ObjectTimestamp } from "@/types/object.types";

/**
 * Transforms timestamps PDT files into object attributes.
 *
 * @param timestampsFiles Array of all PDT timestamps files.
 *
 * @returns JSON PDT content with time representation inside object attributes.
 *
 * @throws `JSON Data undefined` if JSON files parsing failed.
 */
export async function timestampsToPDTJSON(
    timestampsFiles: string[]
): Promise<{ name: any; objects: ObjectJSON[] }> {
    const JSONData = await Promise.all(
        timestampsFiles.map(async (file) => {
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
}

/**
 * Represents PDT model provided by API
 */
export class PDT {
    /** PDT name. Used for identifying PDT*/
    name!: string;
    /** PDT directory. Only used for PDT loading*/
    private PDTDir: string;
    /** PDT objects ready for providing  */
    objects!: ObjectJSON[];

    /**
     * Creates new empty PDT with only its directory path. Should be initialized with init() method
     * @see {@link PDT.init | PDT.init()}
     * @param PDTDir : Directory to PDT dataset
     */
    constructor(PDTDir: string) {
        this.PDTDir = path.resolve("data", PDTDir).normalize();
    }

    /**
     * Initiate PDT with loading all JSON timestamps
     */
    public async init() {
        const timestamps = (await readdir(this.PDTDir))
            .filter((file) => file.split(".json")[0] !== file)
            .map((file) => `${this.PDTDir}/${file}`);
        const json = await timestampsToPDTJSON(timestamps);

        this.name = json.name || path.basename(this.PDTDir);
        this.objects = json.objects;
    }

    /**
     * Give PDT but with only puglic data (without PDTDir)
     *
     * @returns PDT without private attributes
     */
    public getPublicPDT(): { name: string; objects: ObjectJSON[] } {
        return { name: this.name, objects: this.objects };
    }

    /**
     * Give PDT name
     *
     * @returns PDT name
     */
    public getName = (): string => this.name;
}
