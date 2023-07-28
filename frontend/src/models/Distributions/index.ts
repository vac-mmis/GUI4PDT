/**
 * Index of distributions implementations
 *
 * @remark For each new distribution :
 * 1. Add a new submodule file in this folder.
 * 2. Create in this file a new class that implements {@link Distribution} interface (see {@link Distribution})
 * 3. Import it at the top of this index.
 * 4. Add it to {@link distClassList} array.
 * 5. Export it at the bottom of this index, as existing distributions.
 *
 * @module dist
 */

import { Categorical } from "./Categorical";
import { MultivariateNormal } from "./MultiNormal";
import { MultivariateVonMises } from "./MultiVonMises";
import { UniformContinuous } from "./UniContinuous";

/**
 * List of available distribution classes. New ones must be added here.
 */
const distClassList = [
    UniformContinuous,
    MultivariateNormal,
    MultivariateVonMises,
    Categorical,
] as const;

/**
 * Dictionary which associates distribution names to their constructors
 *
 * @remark Please add `static distName` attribute to each new implementation, this is used here to build this dictionary.
 */
const distributions = distClassList.reduce(
    (o, distClass) =>
        Object.assign(o, {
            [distClass.distName]: distClass,
        }),
    {} as Record<string, (typeof distClassList)[number]>
);

/**
 * Interface representing a distribution object.
 *
 * @remark Each new distribution implementation must implement this interface.
 * @remark Each new one must have a `static distName` equal to `type`, it is used to distinct classes in `distributions` variable.
 */
export abstract class Distribution {
    /**
     * Name of the implemented distribution share by all distributions data.
     *
     * @remark Must be equal to `distName`. Please define this attribute with `type = <DistClassName>.distName`.
     */
    type!: string;

    /**
     * Gives distribution type name.
     *
     * @returns Distribution type name.
     */
    public abstract getType(): string;

    /**
     * If exists, gives distribution mean.
     *
     * @returns Distribution mean.
     */
    public abstract getMean(): any;

    /**
     * If relevant, changes distribution mean with `newMean`.
     *
     * @param newMean New mean to set.
     */
    public abstract setMean(newMean: number[]): void;

    /**
     * Gives random draw of the distribution.
     *
     * @param relative If `true`, draw with centered mean.
     *
     * @returns Distribution random draw.
     */
    public abstract random(relative?: boolean): any;

    /**
     * Gives data representation of the distribution.
     *
     * @param relative If `true`, draw with centered mean.
     *
     * @returns Distribution data for representation.
     */
    public abstract representation(relative?: boolean): any;
}

/**
 * Factory method to create a concrete distribution from distribution data.
 *
 * @param distData Distribution data.
 * @returns Concrete distribution instance.
 */
export function makeDistribution(dist: Distribution, ...params: any): Distribution {
    if (Object.keys(distributions).includes(dist.type)) {
        return new distributions[dist.type](dist as any, ...params);
    } else {
        throw new Error("Unsupported distribution type.");
    }
}

export { Categorical } from "./Categorical";
export { MultivariateNormal } from "./MultiNormal";
export { MultivariateVonMises } from "./MultiVonMises";
export { UniformContinuous } from "./UniContinuous";
