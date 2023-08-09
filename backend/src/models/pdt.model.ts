/**
 * Defines PDT class and timestamp conversion.
 *
 * @namespace pdt.model
 */
import { readFile, readdir } from "fs/promises";
import { createReadStream } from "fs";

import path from "path";
import { parse } from "csv";
import { finished } from "stream/promises";

import { logger } from "@/utils/logger";
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
export async function PDTTimestampsToPDTJSON(
    timestampsFiles: string[]
): Promise<{ name: string; objects: ObjectJSON[] }> {
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
 * Parse depth map from CSV file to array of points.
 *
 * @param CSVFile File to parse.
 *
 * @returns Array of points representing the depth map.
 */
export async function parseMap(CSVFile: string): Promise<number[][]> {
    const records = [[]] as number[][];

    const rs = createReadStream(CSVFile);
    const parser = rs.pipe(
        parse({
            from_line: 2,
            skip_empty_lines: true,
        })
    );
    parser.on("readable", function () {
        let record: string[];
        while ((record = parser.read()) !== null) {
            records.push(record.map(Number));
        }
    });
    await finished(rs);
    rs.resume(); // Drain the stream.

    return records.slice(1); // Remove first empty line
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
    /** PDT see elevation map */
    elevationMap?: number[][];

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
        const json = await PDTTimestampsToPDTJSON(timestamps);

        this.name = json.name || path.basename(this.PDTDir);
        this.objects = json.objects;
        await parseMap(`${this.PDTDir}/gp_elevation_map.csv`)
            .then((res) => {
                this.elevationMap = res;
            })
            .catch(() => logger.warn(`No elevation map available for ${this.name}.`));
    }

    /**
     * Give PDT but with only public data (without PDTDir)
     *
     * @returns PDT without private attributes
     */
    public getPublicPDT(): {
        name: string;
        objects: ObjectJSON[];
        elevationMap?: number[][];
    } {
        return { name: this.name, objects: this.objects, elevationMap: this.elevationMap };
    }

    /**
     * Give PDT name
     *
     * @returns PDT name
     */
    public getName = (): string => this.name;
}
