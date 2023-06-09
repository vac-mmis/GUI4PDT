import type { ElementType } from "../types/element.types";
import type { LocationType } from "../types/location.types";
import type { RotationType } from "../types/rotation.types";
import type { MaterialType } from "../types/material.types";
export default class PDTObject {
    id?: number;
    type?: ElementType;
    location?: LocationType;
    rotation?: RotationType;
    scale?: [number, number, number];
    material?: MaterialType;
}
