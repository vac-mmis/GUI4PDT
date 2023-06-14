import { PlotData } from "plotly.js-dist-min";
import { OBJLoader } from "./OBJLoader/OBJLoader";
import path from "path";
import fs from "fs";

const loader = new OBJLoader();

const modelToData = (modelName: string, objModel: any): Partial<PlotData> => {
    const geometry = objModel.children[0].geometry;
    const positions = geometry.getAttribute("position").array;

    if (positions.length % 3 !== 0) {
        console.error("Error: Invalid position attribute length");
        return {} as Partial<PlotData>;
    }

    const vertices = [];
    for (let i = 0; i < positions.length; i += 3) {
        vertices.push({
            x: positions[i + 0],
            y: positions[i + 2],
            z: positions[i + 1],
        });
    }

    const faces = [];
    for (let i = 0; i < vertices.length / 3; i++) {
        faces.push({
            a: i * 3 + 0,
            b: i * 3 + 2,
            c: i * 3 + 1,
        });
    }

    // Create the trace
    const model: Partial<PlotData> = {
        name: modelName,
        type: "mesh3d",
        x: vertices.map((vertex: any) => vertex.x),
        y: vertices.map((vertex: any) => vertex.y),
        z: vertices.map((vertex: any) => vertex.z),
        i: Float32Array.from(faces.map((face: any) => face.a)),
        j: Float32Array.from(faces.map((face: any) => face.b)),
        k: Float32Array.from(faces.map((face: any) => face.c)),
    };
    return model;
};

export const loadModels = async (
    baseDir: string,
    paths: string[]
): Promise<Partial<PlotData>[]> => {
    const promises = paths.map((filePath: string) => {
        const url = path.normalize(path.join(baseDir, filePath));
        return new Promise<Partial<PlotData>>((resolve, reject) => {
            try {
                const data = fs.readFileSync(url, "utf-8");
                const object = loader.parse(data);
                const trace = modelToData(path.basename(url, ".obj").toLowerCase(), object);
                resolve(trace);
            } catch (error) {
                console.error(`Failed to load OBJ file: ${url}`);
                console.error(error);
                resolve({} as Partial<PlotData>); // Resolve with null if there's an error
            }
        });
    });
    try {
        const data = await Promise.all(promises);
        return data;
    } catch (error) {
        console.error("An error occurred while loading models:", error);
        return [];
    }
};
