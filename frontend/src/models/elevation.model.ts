/**
 * Elevation map object, represented as {@link Surface} with variations
 *
 * @module elevation
 */

import { Controller } from "./Controls/Controller";
import { BoxGeometry, Group, InstancedMesh, Matrix4, Color, MeshStandardMaterial } from "three";
import { makeRepresentation, type Representation } from "@/models/Representations";

import { materialStore } from "@/store/material.store";

const MapVisibilities = ["invisible", "absolute"] as const;
export type MapVisibility = (typeof MapVisibilities)[number];

const MapVariationsVisibilities = ["invisible", "prob"] as const;
export type MapVariationsVisibility = (typeof MapVariationsVisibilities)[number];

/**
 * Create a surface representation from a coordinates grid with water surface.
 *
 * @param mapData Grid dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`.
 *
 * @returns Desired surface mesh.
 */
const createSurface = (mapData: [number, number, number, number][]) => {
    const { find } = materialStore();
    const waterMaterial =
        find("water") ??
        new MeshStandardMaterial({
            color: new Color("blue"),
        });
    waterMaterial.transparent = true;
    waterMaterial.opacity = 0.5;
    return makeRepresentation("surface", mapData, waterMaterial);
};

/**
 * Create a grid of variation bars for map representation.
 *
 * @param mapData Grid dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`.
 *
 * @returns Desired variation plots as grid of vertical bars.
 */
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

/**
 * Implement elevation map object from grid with surface and variations
 */
export class ElevationMap extends Group {
    /** Map dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`. */
    private mapData: [number, number, number, number][];
    /** Elevation surface as {@link Surface} representation. */
    private mapSurface: Representation;
    /** Representation of variations as vertical bars */
    private mapVariations;

    /** Surface map controller module  */
    private surfaceController: Controller<MapVisibility>;
    /** Z-variations map controller module  */
    private variationsController: Controller<MapVariationsVisibility>;

    /**
     * Creates an elevation map from map grid.
     *
     * @param mapData Grid dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`.
     */
    constructor(elevationMap: [number, number, number, number][]) {
        super();
        this.mapData = elevationMap;

        // Create map surface
        this.mapSurface = createSurface(this.mapData);
        this.add(this.mapSurface);

        // create map variations
        this.mapVariations = createVariations(this.mapData);
        this.add(this.mapVariations);

        // init controllers
        this.surfaceController = new Controller<MapVisibility>(
            "surface",
            MapVisibilities,
            "Map surface",
            () => (this.mapSurface.visible ? "absolute" : "invisible"),
            (visibility) => {
                this.mapSurface.visible = visibility === "absolute";
            }
        );
        this.variationsController = new Controller<MapVariationsVisibility>(
            "z-var",
            MapVariationsVisibilities,
            "Map variations",
            () => (this.mapVariations.visible ? "prob" : "invisible"),
            (visibility) => {
                this.mapVariations.visible = visibility === "prob";
            }
        );
    }

    /**
     * Give map surface controller to toggle surface visibility
     *
     * @returns Map surface controller
     */
    public getSurfaceController = (): Controller<MapVisibility> => this.surfaceController;

    /**
     * Give map variations controller to toggle variations visibility
     *
     * @returns Map variations controller
     */
    public getVariationsController = () => this.variationsController;
}
