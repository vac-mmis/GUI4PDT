/**
 * Implementation of multivariate continuous uniform distribution.
 *
 * @module Distribution.UniformContinuous
 */

import { mean } from "mathjs";

import type { UniContinuousJSON } from "@/interfaces/distribution";
import { matrixToKaTeX, vectorToKaTeX } from "@/utils/katex";

/**
 * Implementation of multivariate continuous uniform distribution.
 *
 * @remark Could be use at any dimension.
 *
 * @see {@link https://en.wikipedia.org/wiki/Continuous_uniform_distribution Continuous uniform distribution on Wikipedia}
 */
export class UniformContinuous implements UniContinuousJSON {
    /** Distribution class name */
    static distName = "uniform-continuous" as const;
    readonly type = UniformContinuous.distName;

    readonly mean: number[];
    readonly params: number[][];

    /**
     *  Creates new multivariate continuous uniform distribution from given distribution data.
     *
     * @param dist Multivariate continuous uniform distribution data with mean and parameters.
     */
    constructor(dist: UniformContinuous) {
        this.params = dist.params;
        this.mean = dist.params.map((p) => mean(p));
    }

    public getMode = () => this.mean;

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

    public toString(): string {
        const meanString = vectorToKaTeX(this.mean);
        const paramsString = matrixToKaTeX(this.params);
        return `Distribution : $\\mathcal{U}_{a,b}$ with : \n - mean : $${meanString}$ \n - params : $${paramsString}$`;
    }

   
    
    
}
