/**
 * PDT map representation, represented as {@link Surface} with variations.
 *
 * @module map.model
 */
import { Group, Color, MeshStandardMaterial } from "three";

import { Controller } from "@/models/Controls/Controller";
import { makeRepresentation, type Representation } from "@/models/Representations";

const MapVisibilities = ["invisible", "absolute"] as const;
export type MapVisibility = (typeof MapVisibilities)[number];

const MapVariationsVisibilities = ["invisible", "prob"] as const;
export type MapVariationsVisibility = (typeof MapVariationsVisibilities)[number];

/**
 * Implements map from grid with surface and variations
 */
export class Map extends Group {
    /** Map dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`. */
    private mapData: [number, number, number, number][];
    /** Elevation surface as {@link Surface} representation. */
    private mapSurface: Representation;
    /** Representation of variations as vertical bars */
    private mapVariations: Representation;

    /** Surface map controller module  */
    private surfaceController: Controller<MapVisibility>;
    /** Z-variations map controller module  */
    private variationsController: Controller<MapVariationsVisibility>;

    /**
     * Creates a map from data grid.
     *
     * @param mapData Grid dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`.
     */
    constructor(
        mapData: [number, number, number, number][],
        material: MeshStandardMaterial = new MeshStandardMaterial({
            color: new Color("blue"),
            transparent: true,
            opacity: 0.5,
        })
    ) {
        super();
        this.mapData = mapData;

        // Create map surface
        this.mapSurface = makeRepresentation("surface", this.mapData, material);
        this.add(this.mapSurface);

        // create map variations
        this.mapVariations = makeRepresentation("z-var", this.mapData);
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
