// TODO : patch broken obj conversion in backend

const modelToData = (objModel: any): Partial<Plotly.Data> | undefined => {
    const geometry = objModel.children[0].geometry;
    const positions = geometry.getAttribute("position").array;
    if (positions.length % 3 !== 0) {
        console.log("Error: Invalid position attribute length");
        return undefined;
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
    const model: Partial<Plotly.Data> = {
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

const loadModels = (path: string): Promise<Partial<Plotly.Data>[]> => {
    return new Promise(async (resolve, reject) => {
        const OBJLoader = await import("three/examples/jsm/loaders/OBJLoader").then(
            (module) => module.OBJLoader
        );
        const loader = new OBJLoader();
        loader.load(
            path,
            (objModel: any) => {
                const model = modelToData(objModel);
                if (model) {
                    console.log(model);
                    resolve([model]);
                } else {
                    reject(new Error("Error converting model to data"));
                }
            },
            undefined,
            (error: any) => {
                reject(new Error(`Failed to load model: ${error.message}`));
            }
        );
    });
};
