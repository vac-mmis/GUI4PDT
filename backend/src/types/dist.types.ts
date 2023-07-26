/**
 * This file contains the distributions types handled by backend.
 * PDTs JSON files must follows this representation to be loaded
 *
 * New distribution type must be added here and should contains the `type` attributes to distinct it from the others
 *
 * @module dist.types
 */

/**
 * Represents multivariate normal distribution JSON format
 *
 * @see {@link https://en.wikipedia.org/wiki/Multivariate_normal_distribution Multivariate normal distribution on Wikipedia}
 */
export type MultivariateNormal = {
    type: "multivariate-normal";
    mean: number[];
    cov: number[][];
};

/**
 * Represents multivariate continuous uniform distribution JSON format
 *
 * @see {@link https://en.wikipedia.org/wiki/Continuous_uniform_distribution Continuous uniform distribution on Wikipedia}
 */
export type UniformContinuous = {
    type: "uniform-continuous";
    params: number[][];
};

/**
 * Represents Von Mises distributions JSON format
 *
 * @see {@link https://en.wikipedia.org/wiki/Von_Mises_distribution Von Mises distribution on Wikipedia}
 */
export type VonMises = {
    type: "von-mises";
    mean: number[];
    kappa: number[];
};

/**
 * Represents categorical distributions JSON format
 *
 * @see {@link https://en.wikipedia.org/wiki/Categorical_distribution Categorical distribution on Wikipedia}
 */
export type Categorical = {
    type: "categorical";
    mass: Record<string, number>;
};
