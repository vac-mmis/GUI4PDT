import { sqrtm, add, multiply, sum } from "mathjs";

import { Distribution } from "@/models/distribution/dist";

export class MultivariateNormal extends Distribution {
    private mean: number[];
    private cov: number[][];
    private invCov: number[][];

    constructor(dist: MultivariateNormal) {
        super("multivariate-normal");
        this.mean = dist.mean;
        this.cov = dist.cov;
        this.invCov = sqrtm(this.cov);
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

    public random(relative: boolean = false) {
        const X: number[] = Array.from({ length: this.mean.length }, (_, i) => this.randomGauss());
        const XInvCov = multiply(this.invCov, X);
        return (relative ? XInvCov : add(XInvCov, this.mean)) as number[];
    }

    private randomN(
        numPoints: number = 1,
        relative: boolean = false,
        withDistance: boolean = true
    ) {
        const dataPoints = Array.from({ length: numPoints }, () => {
            const Y = this.random(relative);
            if (withDistance) {
                const distance = Math.sqrt(
                    sum(Y.map((y, i) => Math.pow(y - (relative ? 0 : this.mean[i]), 2)))
                );
                if (distance < 0) {
                    throw new Error("Negative distance");
                }
                return [...Y, distance];
            }
            return Y;
        });

        const maxDistance = withDistance ? Math.max(...dataPoints.map((Y) => Y[Y.length - 1])) : 1;

        return dataPoints.flatMap((Y) => {
            if (withDistance) {
                const distance = Y.pop()!;
                const prob = 1 - distance / maxDistance;
                return [...Y, prob < 1 ? prob : 0];
            }
            return Y;
        });
    }

    public representation(relative: boolean = false) {
        return this.randomN(1000, relative, true);
    }
}
