import { ObjectJSONType } from "@/types/object.types";
import { multivariateNormal, uniformContinuous, getMean } from "../services/dist.services";
import { PlotData } from "plotly.js-dist-min";

const objToData = (obj: ObjectJSONType, models?: Partial<PlotData>[]): Partial<PlotData>[] => {
    const placeObject = (model: Partial<PlotData>, loc: number[], scale: number[], p: number) => {
        const res = {} as Partial<PlotData>;
        res.name = model.name;
        res.x = (model.x as number[]).map((x) => x * scale[0] + loc[0]);
        res.y = (model.y as number[]).map((y) => y * scale[1] + loc[1]);
        res.z = (model.z as number[]).map((z) => z * scale[2] + loc[2]);
        res.type = model.type;
        res.i = model.i;
        res.j = model.j;
        res.k = model.k;
        res.opacity = p;
        res.customdata = [obj.id];
        return res;
    };

    if (models === undefined) {
        return [];
    }

    const loc = getMean(obj.location.distribution);

    if (typeof obj.type === "string") {
        const model = models.find((model) => model.name === obj.type);
        if (model === undefined) {
            return [];
        } else {
            return [placeObject(model, loc, obj.scale, 1)];
        }
    } else {
        const dist = obj.type.distribution;
        const res = Object.entries(dist.mass)
            .map((type) => {
                const model = models.find((m) => {
                    return m.name === type[0];
                });
                if (model === undefined) {
                    return undefined;
                } else {
                    return placeObject(model, loc, obj.scale, type[1]);
                }
            })
            .filter((model): model is Partial<PlotData> => model !== undefined);
        return res.length === 0 ? [] : res;
    }
};

const typeToData = (obj: ObjectJSONType): Partial<PlotData> => {
    if (typeof obj.type === "string") {
        return {
            values: [100],
            labels: [obj.type],
            type: "pie",
            customdata: [obj.id],
        };
    } else {
        return {
            values: Object.values(obj.type.distribution.mass),
            labels: Object.keys(obj.type.distribution.mass),
            type: "pie",
            customdata: [obj.id],
        };
    }
};

const locationToData = (obj: ObjectJSONType): any => {
    const dist = obj.location.distribution;
    if (dist.representation === "multivariate-normal") {
        const dataPoints = multivariateNormal(dist);
        return {
            x: dataPoints[0],
            y: dataPoints[1],
            z: dataPoints[2],
            mode: "markers",
            type: "scatter3d",
            opacity: 0.5,
            marker: {
                color: dataPoints[3],
                colorscale: "Viridis",
                size: 2,
                showscale: false,
            },
            xaxis: "x",
            yaxis: "y",
            customdata: [obj.id],
        };
    } else {
        const dataPoints = uniformContinuous(dist);
        return {
            x: dataPoints[0],
            y: dataPoints[1],
            z: dataPoints[2],
            i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
            j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
            k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
            customdata: [obj.id],
            type: "mesh3d",
            opacity: 0.5,
            flatshading: true,
            intensity: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            colorscale: "Viridis",
            showscale: false,
        };
    }
};

export default {
    locationToData,
    typeToData,
    objToData,
};
