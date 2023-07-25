/**
 * This file contains types used to define objects and their attributes
 * PDTs JSON files must follows these representations to be loaded
 *
 * New object attributes must be added here. If it's a distributed property, it should have a `dist` sub-attribute which should contains one of the types available in {@link Distribution} like this :
 * ```ts
 * export type NewPropertyJSON =
 *      | Type1
 *      | { dist : Dist1 | Dist2 ... }
 *      | ...
 * ```
 * @module object.types
 */

import type {
    MultivariateNormal,
    UniformContinuous,
    Categorical,
    VonMises,
} from "@/types/dist.types";

/**
 * Represents possible types of an object (ex : 30% tetrapod, 70% reefcone)
 *
 * @remark Class names must be in lowercase and correspond to model folder and file names in `assets/models` folder.
 */
export type ClassJSON = string | { dist: Categorical };

/**
 * Represents a distribution of the object location
 */
export type LocationJSON =
    | { dist: MultivariateNormal | UniformContinuous }
    | [number, number, number];

/**
 * Represents a distribution of the object rotation
 */
export type RotationJSON = { dist: VonMises } | [number, number, number];

/**
 * Represents possible materials of an object
 *
 * @remark Material names must be in lowercase and correspond to material folder and file names in `assets/materials` folder.
 */
export type MaterialJSON = string | { dist: Categorical };

/**
 * Represents object type in PDT JSON timestamps **before** the parsing executed in {@link Models.timestampsToPDTJSON | PDT.init()}.
 */
export type ObjectTimestamp = {
    id: number;
    class: ClassJSON;
    location: LocationJSON;
    rotation?: RotationJSON;
    material: MaterialJSON;
    scale?: number;
    physics?: boolean;
};

/**
 * Represents object type served to the API, therefore **after** {@link Models.timestampsToPDTJSON | PDT.init()}.
 */
export type ObjectJSON = {
    id: number;
    class: ClassJSON[];
    location: LocationJSON[];
    material: MaterialJSON[];
    rotation: (RotationJSON | undefined)[];
    scale: (number | undefined)[];
    physics: (boolean | undefined)[];
};
