import type { Group, Intersection, Object3D } from "three";

export interface WorldContent extends Group {
    getClickables: () => Object3D[] | undefined;
    getHoverables: () => Object3D[] | undefined;
    onClick: (intersect: Intersection<Object3D>) => Object3D | undefined;
    onHover: (intersect: Intersection<Object3D>) => Object3D | undefined;
}
