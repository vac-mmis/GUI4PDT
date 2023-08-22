/**
 * Properties API interface.
 *
 * @module Interfaces.Properties
 */
import type { Distribution, Categorical } from "@/models/Distributions";

/**
 * Class data type, following the backend API data format.
 */
export type ClassJSON = string | { dist: Categorical };

/**
 * Material data type, following the backend API data format.
 */
export type MaterialJSON = string | { dist: Categorical };

/**
 * Location data type, following the backend API data format.
 */
export type LocationJSON = { dist: Distribution } | [number, number, number];

/**
 * Rotation data type, following the backend API data format.
 */
export type RotationJSON = { dist: Distribution } | [number, number, number];
