import type { PDTObjectType } from "../types/object.types";
import { multivariateNormal, uniformContinuous } from "../services/dist.services";

import Plotly from "plotly.js-dist-min";

const toData = (obj: PDTObjectType): Partial<Plotly.RootOrData> => {
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
            },
            cmin: 0,
            cmax: 1,
            xaxis: "x",
            yaxis: "y",
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
            type: "mesh3d",
            opacity: 0.5,
            cmin: 0,
            cmax: 1,
            flatshading: true,
            intensity: [
                0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714,
                0.7142857142857143, 0.8571428571428571, 1,
            ],
            colorscale: "Viridis",
        };
    }
};

export default {
    toData,
};
