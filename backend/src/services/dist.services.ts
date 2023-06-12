import type { MultivariateNormal } from "@/types/dist.types";
import { abs } from "mathjs";
import { sqrtm, add, multiply, mean } from "mathjs";

const LOCATION_NUM_POINTS = 100;

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
    }

    const meanPoint = [mean(dataPoints[0]), mean(dataPoints[1]), mean(dataPoints[2])];

    dataPoints[3] = dataPoints[0].map((_, index) => {
        const x = abs((dataPoints[0][index] - meanPoint[0]) / meanPoint[0]);
        const y = abs((dataPoints[1][index] - meanPoint[1]) / meanPoint[1]);
        const z = abs((dataPoints[2][index] - meanPoint[2]) / meanPoint[2]);
        return (x + y + z) / 3;
    });

    return dataPoints;
};
