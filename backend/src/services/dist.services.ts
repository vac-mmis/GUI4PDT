import type { MultivariateNormal, UniformContinuous } from "@/types/dist.types";
import { abs } from "mathjs";
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
        dataPoints[3].push(0);
    }

    const meanPoint = [mean(dataPoints[0]), mean(dataPoints[1]), mean(dataPoints[2])];

    dataPoints[3] = dataPoints[3].map((_, index) => {
        const x = 1 - abs((dataPoints[0][index] - meanPoint[0]) / meanPoint[0]);
        const y = 1 - abs((dataPoints[1][index] - meanPoint[1]) / meanPoint[1]);
        const z = 1 - abs((dataPoints[2][index] - meanPoint[2]) / meanPoint[2]);
        return (x + y + z) / 3;
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
