import { sqrtm, add, multiply, sum } from "mathjs";

import { Distribution } from "@/models/distribution/dist.model";

export class MultivariateNormal extends Distribution implements MultivariateNormal {
    mean: number[];
    cov: number[][];

    constructor(dist: MultivariateNormal) {
        super("multivariate-normal");
        this.mean = dist.mean;
        this.cov = dist.cov;
    }

    private randomGauss() {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z0;
    }

    public getMean = () => this.mean;

    public setMean(newMean: number[]): void {
        this.mean = newMean;
    }

    public getCov = () => this.cov;

    public random() {
        const invCov: number[][] = sqrtm(this.cov);
        const X: number[] = Array.from({ length: this.mean.length }, (_, i) => this.randomGauss());
        const Y: number[] = add(multiply(invCov, X), this.mean) as number[];
        return Y;
    }

    private randomN(numPoints: number = 1, withDistance: boolean = true) {
        let dataPoints: number[] = [];
        for (let index = 0; index < numPoints; index++) {
            const Y = this.random();

            if (withDistance) {
                const distance = Math.sqrt(sum(Y.map((y, i) => Math.pow(y - this.mean[i], 2))));
                if (distance < 0) {
                    throw new Error("Negative distance");
                }
                Y.push(distance);
            }
            dataPoints.push(...Y);
        }

        if (withDistance) {
            const maxDistance = Math.max(...dataPoints.filter((_, i) => i % 4 === 3));
            dataPoints = dataPoints.map((p, i) => {
                if (i % 4 === 3) {
                    const prob = 1 - p / maxDistance;
                    return prob < 1 ? prob : 0;
                } else return p;
            });
        }

        return dataPoints;
    }

    public representation() {
        return this.randomN(1000, true);
    }
}
