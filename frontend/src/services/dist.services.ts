import { sqrtm, add, multiply, mean } from "mathjs";

export type MultivariateNormal = {
    type: "multivariate-normal";
    mean: number[];
    cov: number[][];
};

export type UniformContinuous = {
    type: "uniform-continous";
    "x-min": number;
    "x-max": number;
    "y-min": number;
    "y-max": number;
    "z-min": number;
    "z-max": number;
};

export type Categorical<E extends string> = {
    type: "categorical";
    mass: Record<E, number>;
};

export type VonMises = {
    type: "von-mises";
    mean: number;
    dispersion: number;
};

export const multivariateNormal = (dist: MultivariateNormal, numPoints: number = 1) => {
    function randomGauss() {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z0;
    }

    const invCov: number[][] = sqrtm(dist.cov);
    let dataPoints: number[] = [];
    for (let index = 0; index < numPoints; index++) {
        const X: number[] = [randomGauss(), randomGauss(), randomGauss()];
        const Y: number[] = add(multiply(invCov, X), dist.mean) as number[];

        const distance = Math.sqrt(
            Math.pow(Y[0] - dist.mean[0], 2) +
                Math.pow(Y[1] - dist.mean[1], 2) +
                Math.pow(Y[2] - dist.mean[2], 2)
        );
        if (distance < 0) {
            throw new Error("Negative distance");
        }
        Y.push(distance);
        dataPoints.push(...Y);
    }

    const maxDistance = Math.max(...dataPoints.filter((_, i) => i % 4 === 3));
    dataPoints = dataPoints.map((p, i) => {
        if (i % 4 === 3) {
            const prob = 1 - p / maxDistance;
            return prob < 1 ? prob : 0;
        } else return p;
    });

    return dataPoints;
};

export const uniformContinuous = (dist: UniformContinuous) => {
    const xMin = dist["x-min"];
    const xMax = dist["x-max"];
    const yMin = dist["y-min"];
    const yMax = dist["y-max"];
    const zMin = dist["z-min"];
    const zMax = dist["z-max"];

    return [
        [xMin, xMax, xMax, xMin, xMin, xMax, xMax, xMin],
        [yMin, yMin, yMax, yMax, yMin, yMin, yMax, yMax],
        [zMin, zMin, zMin, zMin, zMax, zMax, zMax, zMax],
    ];
};

export const getMean = (dist: MultivariateNormal | UniformContinuous): number[] => {
    if (dist.type === "multivariate-normal") {
        return dist.mean;
    } else {
        return [
            mean([dist["x-min"], dist["x-max"]]),
            mean([dist["y-min"], dist["y-max"]]),
            mean([dist["z-min"], dist["z-max"]]),
        ];
    }
};
