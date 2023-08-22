/**
 * Distributions API interface.
 *
 * @module Interfaces.Distributions
 */

/**
 * Main Distribution API interface
 */
export interface DistJSON {
    type: string;
}

/**
 * Categorical distribution API interface
 */
export interface CatJSON extends DistJSON {
    /** Values and their probabilities. */
    mass: Record<string, number>;
}

/**
 * Multivariate normal distribution API interface
 */
export interface MultiNormalJSON extends DistJSON {
    type: "multivariate-normal";
    mean: number[];
    /** Covariance matrix. */
    cov: number[][];
}

/**
 * Multivariate Von Mises distribution API interface
 */
export interface MultiVonMisesJSON extends DistJSON {
    type: "von-mises";
    mean: number[];
    /** Concentration */
    kappa: number[];
}

/**
 * Multivariate continuous uniform distribution API interface
 */
export interface UniContinuousJSON extends DistJSON {
    type: "uniform-continuous";
    /** Geometric center point of the distribution */
    mean: number[];
    /** Distributions interval for each dimension : `[[xMin, xMax], [yMin, yMax], [zMin,zMax] ...]` */
    params: number[][];
}
