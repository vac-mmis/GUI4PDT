/**
 * This file contains types used to define file blobs for materials and models served by this API.
 *
 * @module object.types
 */

/**
 * Represents material blob format provided by the API
 */
export type MaterialFile = {
    /**name */
    name: string;
    albedo: string;
    ao: string;
    metalness: string;
    normal: string;
    roughness: string;
};

/**
 * Represents model blob format provided by the API
 */
export type ModelFile = {
    name: string;
    content: string;
};
