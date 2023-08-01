/**
 * Index of available Three.JS representations
 *
 * @remark For each new representation :
 * 1. Add a new submodule file in this folder.
 * 2. Create in this file a new class that implements {@link Representation} interface (see {@link Representation}).
 * 3. Import it at the top of this index.
 * 4. Add it to {@link repClassList} variable, as existing representations.
 * 5. Export it at the bottom of this index, as existing representations.
 *
 * @module representation
 */

import type { Object3D } from "three";

import { ObjectRepresentation } from "./Object";
import { Box } from "./Box";
import { Scatter3D } from "./Scatter3D";
import { Surface } from "./Surface";

/**
 * List of available representation classes. New ones must be added here.
 */
const repClassList = [Scatter3D, Box, ObjectRepresentation, Surface] as const;

/**
 * Dictionary which associates representation names to their constructors
 *
 * @remark Please add `static repName` attribute to each new implementation, this is used here to build this dictionary.
 */
const representations = repClassList.reduce(
    (o, repClass) =>
        Object.assign(o, {
            [repClass.repName]: repClass,
        }),
    {} as Record<string, (typeof repClassList)[number]>
);

/**
 * Interface of representations.
 *
 * @remark Each new representation implementation should implement this interface.
 * @remark Each new one must have a `static repName`.
 */
export interface Representation extends Object3D {
    /**
     * Updates representation
     *
     * @param params Parameters to change
     */
    update(...params: any): void;
}

/**
 * Available representation parameters type.
 */
type RepParams = ConstructorParameters<(typeof repClassList)[number]>;

/**
 * Factory method to create a representation from any data.
 *
 * @param type Name of the desired representation, used if given parameters could generate several type of representation.
 * @param params Representation parameters, following desired representation constructor prototype
 * @returns Concrete representation instance.
 */
export function makeRepresentation(type: string, ...params: RepParams): Representation {
    if (Object.keys(representations).includes(type)) {
        /// @ts-ignore A spread argument must either have a tuple type or be passed to a rest parameter.ts(2556).
        return new representations[type](...params);
    } else {
        throw new Error(`Unable to create representation with the given parameters`);
    }
}

export { Box } from "./Box";
export { ObjectRepresentation } from "./Object";
export { Scatter3D } from "./Scatter3D";
export { Surface } from "./Surface";
