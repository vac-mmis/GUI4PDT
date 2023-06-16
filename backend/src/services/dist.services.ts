import type { MultivariateNormal, UniformContinuous } from "@/types/dist.types";
import { sqrtm, add, multiply, mean } from "mathjs";

const LOCATION_NUM_POINTS = 1000;

export const multivariateNormal = (dist: MultivariateNormal) => {
    function randomGauss() {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z0;
    }

    const invCov: number[][] = sqrtm(dist.covariance);
    let dataPoints: number[][] = [[], [], [], []];
    for (let index = 0; index < LOCATION_NUM_POINTS; index++) {
        const X: number[] = [randomGauss(), randomGauss(), randomGauss()];
        const Y: number[] = add(multiply(invCov, X), dist.mean) as number[];
        dataPoints[0].push(Y[0]);
        dataPoints[1].push(Y[1]);
        dataPoints[2].push(Y[2]);

        const distance = Math.sqrt(
            Math.pow(Y[0] - dist.mean[0], 2) +
                Math.pow(Y[1] - dist.mean[1], 2) +
                Math.pow(Y[2] - dist.mean[2], 2)
        );
        dataPoints[3].push(distance);
    }

    const maxDistance = Math.max(...dataPoints[3]);
    dataPoints[3] = dataPoints[3].map((distance) => 1 - distance / maxDistance);

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
    if (dist.representation === "multivariate-normal") {
        return dist.mean;
    } else {
        return [
            mean([dist["x-min"], dist["x-max"]]),
            mean([dist["y-min"], dist["y-max"]]),
            mean([dist["z-min"], dist["z-max"]]),
        ];
    }
};
