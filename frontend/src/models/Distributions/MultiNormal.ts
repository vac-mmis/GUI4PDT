/**
 * Implementation of multivariate normal distribution.
 *
 * @module Distribution.MultivariateNormal
 */

import { sqrtm, add, multiply, sum } from "mathjs";
import { matrixToKaTeX, vectorToKaTeX } from "@/utils/katex";

import type { MultiNormalJSON } from "@/interfaces/distribution";

/**
 * Implementation of multivariate normal distribution.
 *
 * @remark Could be use at any dimension.
 *
 * @see {@link https://en.wikipedia.org/wiki/Multivariate_normal_distribution Multivariate normal distribution on Wikipedia}
 */
export class MultivariateNormal implements MultiNormalJSON {
    /** Distribution class name */
    static distName = "multivariate-normal" as const;

    readonly type = MultivariateNormal.distName;
    readonly mean: number[];
    readonly cov: number[][];

    /** Inverted covariance matrix. Stored for computation efficiency. */
    readonly invCov: number[][];

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

    public getMode(){
        return this.mean;
    } 

    public random(relative: boolean = false) {
        const X: number[] = Array.from({ length: this.mean.length }, () =>
           MultivariateNormal.randomGauss()
        );
        const XInvCov = multiply(this.invCov, X);
        return relative ? XInvCov : add(XInvCov, this.mean);
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
    private randomN(N: number = 1, relative: boolean = false, withDistance: boolean = true): number[] {
        const dataPoints: number[][] = [];
        const mean = relative ? Array.from({ length: this.mean.length }, () => 0) : this.mean as number[];
    
        for (let i = 0; i < N; i++) {
            const X = Array.from({ length: this.mean.length }, () => MultivariateNormal.randomGauss());
            const Y = multiply(this.invCov, X);
            const distance = withDistance ? Math.sqrt(sum(Y.map((y, j) => (y - mean[j]) ** 2))) : 0;
    
            if (withDistance && distance < 0) {
                throw new Error("Negative distance");
            }
    
            const point = withDistance ? [...Y, distance] : Y;
            dataPoints.push(point);
        }
    
        const maxDistance = withDistance ? Math.max(...dataPoints.map(point => point[point.length - 1])) : 1;
    
        return dataPoints.flatMap(point => {
            if (withDistance) {
                const distance = point.pop()!;
                const prob = 1 - distance / maxDistance;
                return [...point, prob < 1 ? prob : 0];
            }
            return point;
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
        return this.randomN(100, relative, true);
    }

    public toString(): string {
        const covString = matrixToKaTeX(this.cov);
        const meanString = vectorToKaTeX(this.mean);
        return `Distribution : $\\mathcal{N}(\\mu,\\Sigma)$ with :\n * $\\mu = ${meanString}$\n * $\\Sigma = ${covString}$`;
    }
}
