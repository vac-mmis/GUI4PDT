import { ConeGeometry, Group, Mesh, MeshNormalMaterial, Object3D, type Intersection } from "three";
import { makeRepresentation } from "./Representations";

import { materialStore } from "@/store/material.store";

function createMapHelper() {
    const geometryHelper = new ConeGeometry(0.2, 1, 3);
    geometryHelper.translate(0, 0.5, 0);
    geometryHelper.rotateX(Math.PI / 2);
    return new Mesh(geometryHelper, new MeshNormalMaterial());
}

export class ElevationMap extends Group {
    private helper = createMapHelper();

    constructor(elevationMap: [number, number, number, number][]) {
        super();
        const { find } = materialStore();
        const waterMaterial = find("water");
        waterMaterial.transparent = true;
        waterMaterial.opacity = 0.5;
        this.add(makeRepresentation("surface", elevationMap, waterMaterial));
        this.add(this.helper);
    }

    public updateHelper(intersect: Intersection<Object3D>) {
        this.helper.position.set(0, 0, 0);
        if (intersect.face) {
            this.helper.lookAt(intersect.face.normal);
        }
        this.helper.position.copy(intersect.point);
    }
}
