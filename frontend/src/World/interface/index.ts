/**
 * List all interfaces available for World, especially World content.
 *
 * @module World.Interfaces
 */
import type { Group, Intersection, Object3D } from "three";

/**
 * Interface of content handle by World module.
 */
export interface WorldContent extends Group {
    getClickables: () => Object3D[] | undefined;
    getHoverables: () => Object3D[] | undefined;
    onClick: (intersect: Intersection<Object3D>) => Object3D | undefined;
    onHover: (intersect: Intersection<Object3D>) => Object3D | undefined;
}
