/**
 * Index of distributions implementations
 *
 * @remark For each new distribution :
 * 1. Add a new submodule file in this folder
 * 2. Create in this file a new class that implements {@link Distribution} interface
 * 3. Import it at the top of this index
 * 4. Add it to {@link makeDistribution} factory function with a new `case` in the `switch`
 * 5. Export it at the bottom of this index, as existing distributions
 *
 * @module dist
 */

import { Categorical } from "./Categorical";
import { MultivariateNormal } from "./MultiNormal";
import { MultivariateVonMises } from "./MultiVonMises";
import { UniformContinuous } from "./UniContinuous";

const ANGLE_UNIT = "deg" as const;
/**
 * Interface representing a distribution object.
 *
 * @remark Each new distribution implementation should implement this class.
 */
export interface Distribution {
    /** Name of the implemented distribution. */
    type: string;

    /**
     * Gives distribution type name.
     *
     * @returns Distribution type name.
     */

    /**
     * If exists, gives distribution mean.
     *
     * @returns Distribution mean.
     */
    getMean(): any;

    /**
     * If relevant, changes distribution mean with `newMean`.
     *
     * @param newMean New mean to set.
     */
    setMean(newMean: number[]): void;

    /**
     * Gives random draw of the distribution.
     *
     * @param relative If `true`, draw with centered mean.
     *
     * @returns Distribution random draw.
     */
    random(relative?: boolean): any;

    /**
     * Gives data representation of the distribution.
     *
     * @param relative If `true`, draw with centered mean.
     *
     * @returns Distribution data for representation.
     */
    representation(relative?: boolean): any;
}

/**
 * Factory method to create a concrete distribution from distribution data.
 *
 * @param distData Distribution data.
 * @returns Concrete distribution instance.
 */
export function makeDistribution(dist: Distribution): Distribution {
    switch (dist.type) {
        case "uniform-continuous":
            return new UniformContinuous(dist as UniformContinuous);
        case "multivariate-normal":
            return new MultivariateNormal(dist as MultivariateNormal);
        case "von-mises":
            return new MultivariateVonMises(dist as MultivariateVonMises, ANGLE_UNIT);
        case "categorical":
            return new Categorical(dist as Categorical);
        default:
            throw new Error("Unsupported distribution type.");
    }
}

export { Categorical } from "./Categorical";
export { MultivariateNormal } from "./MultiNormal";
export { MultivariateVonMises } from "./MultiVonMises";
export { UniformContinuous } from "./UniContinuous";
