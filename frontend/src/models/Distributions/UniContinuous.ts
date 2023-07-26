/**
 * Implementation of multivariate continuous uniform distribution.
 *
 * @module dist.uniContinuous
 */

import { mean } from "mathjs";

import type { Distribution } from "@/models/Distributions";

/**
 * Implementation of multivariate continuous uniform distribution.
 *
 * @remark Could be use at any dimension.
 *
 * @see {@link https://en.wikipedia.org/wiki/Continuous_uniform_distribution Continuous uniform distribution on Wikipedia}
 */
export class UniformContinuous implements Distribution {
    type = "uniform-continuous";
    private mean: number[];
    /** Distributions interval for each dimension : `[[xMin, xMax], [yMin, yMax], [zMin,zMax] ...]` */
    private params: number[][];

    /**
     *  Creates new multivariate continuous uniform distribution from given distribution data.
     *
     * @param dist Multivariate continuous uniform distribution data with mean and parameters.
     */
    constructor(dist: UniformContinuous) {
        this.params = dist.params;
        this.mean = dist.params.map((p) => mean(p));
    }

    public getMean = () => this.mean;

    public setMean(newMean: number[]): void {
        const diff = newMean.map((x, i) => x - this.mean[i]);
        this.mean = newMean;
        this.params = this.params.map((p, i) => [p[0] + diff[i], p[1] + diff[i]]);
    }

    public random(): number[] {
        return this.params.map((p) => p[0] + (p[1] - p[0]) * Math.random());
    }

    /**
     * Give distance between each `params` range to build cube for representation.
     *
     * Data format : `[xMax - xMin, yMax - yMin, zMax - zMin, ...]`
     *
     * @returns multivariate continuous uniform representation with array of distance between each dimension range.
     */
    public representation(): number[] {
        return this.params.map((p) => p[1] - p[0]);
    }
}
