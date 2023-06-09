import type { PDTObjectType } from "../types/object.types";
import { multivariateNormal } from "../services/dist.services";

import Plotly from "plotly.js-dist-min";

const toData = (obj: PDTObjectType): Partial<Plotly.Data> => {
    const dist = obj.location.distribution;
    if (dist.representation === "multivariate-normal") {
        const dataPoints = multivariateNormal(dist);
        return {
            x: dataPoints[0],
            y: dataPoints[1],
            z: dataPoints[2],
            mode: "markers",
            type: "scatter3d",
            marker: {
                color: dataPoints[2],
                colorscale: "Viridis",
                size: 2,
                colorbar: {
                    title: "Probability Density",
                },
            },
            xaxis: "x",
            yaxis: "y",
        };
    } else {
        return {};
    }
};

export default {
    toData,
};
