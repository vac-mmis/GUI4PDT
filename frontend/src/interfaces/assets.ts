/**
 * Assets API interface.
 *
 * @module Interfaces.Assets
 */

/**
 * Material file format provided by the backend API.
 */
export interface MaterialFile {
    name: string;
    albedo: string;
    ao: string;
    metalness: string;
    normal: string;
    roughness: string;
}

/**
 * Model file format provided by the backend API.
 */
export interface ModelFile {
    name: string;
    content: string;
}
