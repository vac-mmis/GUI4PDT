/**
 * Index of available Three.JS representations
 *
 * @remark For each new representation :
 * 1. Add a new submodule file in this folder.
 * 2. Create in this file a new class that implements {@link Representation} interface. Make constructor unique as it can be chosen by the factory function
 * 3. Import it at the top of this index.
 * 4. Add it to `constructors` variable as existing representations.
 * 5. Export it at the bottom of this index, as existing distributions.
 *
 * @module representation
 */

import type { Object3D } from "three";

import { ObjectRepresentation } from "./Object";
import { Box } from "./Box";
import { Scatter3D } from "./Scatter3D";

/**
 * List of available constructors.
 */
const constructors = [Scatter3D, Box, ObjectRepresentation] as const;

/**
 * Interface of representations.
 *
 * @remark Each new representation implementation should implement this interface.
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
type RepParams = ConstructorParameters<(typeof constructors)[number]>;

/**
 * Factory method to create a representation from any data.
 *
 * @param rep Representation parameters, following desired representation constructor prototype
 * @returns Concrete distribution instance.
 */
export function makeRepresentation(...params: RepParams): Representation {
    for (const cons of constructors) {
        try {
            // @ts-ignore (A spread argument must either have a tuple type or be passed to a rest parameter.ts(2556))
            return new cons(...(params as ConstructorParameters<typeof cons>));
        } catch (e) {
            continue;
        }
    }
    throw new Error(`Unable to create representation with the given parameters`);
}

export { Box } from "./Box";
export { ObjectRepresentation } from "./Object";
export { Scatter3D } from "./Scatter3D";
