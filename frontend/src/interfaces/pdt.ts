/**
 * PDT and PDt Object API interface.
 *
 * @module Interfaces.PDT
 */

import type { ClassJSON, LocationJSON, MaterialJSON, RotationJSON } from "@/interfaces/properties";
/**
 * PDT object data type, following the backend API data format.
 */
export interface ObjectJSON {
    id: number;
    class: ClassJSON[];
    location: LocationJSON[];
    rotation: RotationJSON[];
    material: MaterialJSON[];
    scale: (number | undefined)[];
    physics?: boolean[];
}

/**
 * PDT data type, following the backend API data format.
 */
export interface PDTJSON {
    name: string;
    objects: ObjectJSON[];
    elevationMap?: [number, number, number, number][];
}
