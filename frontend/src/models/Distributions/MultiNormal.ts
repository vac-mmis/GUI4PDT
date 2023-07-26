/**
 * Implementation of multivariate normal distribution.
 *
 * @module dist.multiNormal
 */

import { sqrtm, add, multiply, sum } from "mathjs";

import type { Distribution } from "@/models/Distributions";

/**
 * Implementation of multivariate normal distribution.
 *
 * @remark Could be use at any dimension.
 *
 * @see {@link https://en.wikipedia.org/wiki/Multivariate_normal_distribution Multivariate normal distribution on Wikipedia}
 */
export class MultivariateNormal implements Distribution {
    type = "multivariate-normal";
    private mean: number[];
    /** Covariance matrix. */
    private cov: number[][];
    /** Inverted covariance matrix. Stored for computation efficiency. */
    private invCov: number[][];

    /**
     * Creates new multivariate normal distribution from given distribution data.
     *
     * @param dist Multivariate normal distribution data with mean and covariance matrix.
     */
    constructor(dist: MultivariateNormal) {
        this.mean = dist.mean;
        this.cov = dist.cov;
        this.invCov = sqrtm(this.cov);
    }

    /**
     * Draw random number from standard normal distribution using Box-Muller method.
     *
     * @returns Drawn normal distributed number.
     *
     * @see {@link https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform | Box-Muller transform on Wikipedia}
     */
    public static randomGauss() {
        const u1 = Math.random();
        const u2 = Math.random();
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    }

    public getMean = () => this.mean;

    public setMean(newMean: number[]): void {
        this.mean = newMean;
    }

    /**
     * Give distribution covariance matrix.
     *
     * @returns Covariance matrix.
     */
    public getCov = () => this.cov;

    public random(relative: boolean = false) {
        const X: number[] = Array.from({ length: this.mean.length }, () =>
            MultivariateNormal.randomGauss()
        );
        const XInvCov = multiply(this.invCov, X);
        return (relative ? XInvCov : add(XInvCov, this.mean)) as number[];
    }

    /**
     * Give flatten `N` vectors from distribution.
     *
     * @param N Number of vectors to draw.
     * @param relative If true, draw with centered mean (null vector).
     * @param withDistance If true, add relative distance to the mean of each object
     *
     * @returns Array of N flatten vectors (with distance if `withDistance`)
     * */
    private randomN(
        N: number = 1,
        relative: boolean = false,
        withDistance: boolean = true
    ): number[] {
        const dataPoints = Array.from({ length: N }, () => {
            const Y = this.random(relative);
            // Add distance to the mean
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
            // Compute relative distance between mean and max
            if (withDistance) {
                const distance = Y.pop()!;
                const prob = 1 - distance / maxDistance;
                return [...Y, prob < 1 ? prob : 0];
            }
            return Y;
        });
    }

    /**
     * Build 1000 cloud points with relative distance to the mean.
     *
     * Data format : `[x0,y0,z0,d0, x1,y1,z1,d1, ..., x1000,y1000,z1000,d1000]`
     *
     * @param relative If `true`, create representation data with centered mean.
     *
     * @returns multivariate normal representation as 1000 flatten cloud points with relative distance to the mean.
     */
    public representation(relative: boolean = false) {
        return this.randomN(1000, relative, true);
    }
}
