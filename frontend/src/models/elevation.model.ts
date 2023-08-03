import {
    BoxGeometry,
    Group,
    Object3D,
    InstancedMesh,
    Matrix4,
    Color,
    MeshStandardMaterial,
    type Intersection,
} from "three";
import { makeRepresentation, type Representation } from "@/models/Representations";

import { materialStore } from "@/store/material.store";

const createSurface = (elevationMap: [number, number, number, number][]) => {
    const { find } = materialStore();
    const waterMaterial =
        find("water") ??
        new MeshStandardMaterial({
            color: new Color("blue"),
        });
    waterMaterial.transparent = true;
    waterMaterial.opacity = 0.5;
    return makeRepresentation("surface", elevationMap, waterMaterial);
};

const createVariations = (mapData: [number, number, number, number][]) => {
    const mapVariations = new InstancedMesh(
        new BoxGeometry(0.05, 0.05, 1),
        new MeshStandardMaterial({
            color: new Color("black"),
            transparent: true,
            opacity: 0.7,
        }),
        mapData.length
    );
    const matrix = new Matrix4();
    mapData.forEach((coord, i) => {
        matrix.makeScale(1, 1, coord[3]);
        matrix.setPosition(...(coord.splice(0, 3) as [number, number, number]));
        mapVariations.setMatrixAt(i, matrix);
    });
    mapVariations.visible = false;
    return mapVariations;
};

export class ElevationMap extends Group {
    private mapData: [number, number, number, number][];
    private mapSurface: Representation;
    private mapVariations;

    constructor(elevationMap: [number, number, number, number][]) {
        super();
        this.mapData = elevationMap;

        // Create map surface
        this.mapSurface = createSurface(this.mapData);
        this.add(this.mapSurface);

        // create map variations
        this.mapVariations = createVariations(this.mapData);
        this.add(this.mapVariations);
    }

    public updateHelper(intersect: Intersection<Object3D>) {}

    /**
     * @returns Map visibility.
     */
    public getMapVisibility = () => this.mapSurface.visible;

    /**
     * Set object visibility.
     *
     * @param showMap New visibility.
     */
    public setMapVisibility(showMap: boolean = true): void {
        this.mapSurface.visible = showMap;
    }

    /**
     * @returns MapVariation visibility
     */
    public getMapVariationVisibility = () => this.mapVariations.visible;

    /**
     * Set location visibility.
     *
     * @param showMapVariation New location visibility.
     */
    public setMapVariationVisibility(showMapVariation: boolean = false): void {
        this.mapVariations.visible = showMapVariation;
    }
}
