/**
 * PDT map representation, represented as {@link Models.Representation.Surface} with variations.
 *
 * @module PDT.Map
 */
import { Group, Color, MeshStandardMaterial } from "three";

import { Controller } from "@/models/Controls/Controller";
import { makeRepresentation, type Representation } from "@/models/Representations";

const MapVisibilities = ["visible", "plot"] as const;
type MapVisibility = (typeof MapVisibilities)[number];

/**
 * Implements map from grid with surface and variations
 */
export class Map extends Group {
    /** Map dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`. */
    private mapData: [number, number, number, number][];
    /** Elevation surface as {@link Models.Representation.Surface} representation. */
    private mapSurface: Representation;
    /** Representation of variations as vertical bars */
    private mapVariations: Representation;

    /** `true` if location is shows as probabilistic */
    private visibility: MapVisibility[] = ["visible"];
    /** Map controller module  */
    private controller: Controller<MapVisibility>;

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
        this.controller = new Controller<MapVisibility>(
            "surface",
            MapVisibilities,
            "Elevation surface",
            () => this.getVisibility(),
            (visibility: MapVisibility[]) => this.setVisibility(visibility)
        );
    }

    /**
     * Get actual map visibility
     *
     * @returns Location visibility
     */
    private getVisibility = (): MapVisibility[] => this.visibility;

    /**
     * Set map visibility
     *
     * @param visibility Desired location visibility
     */
    private setVisibility(visibility: MapVisibility[]) {
        this.visibility = visibility;
        this.mapSurface.visible = this.visibility.includes("visible");
        this.mapVariations.visible = this.visibility.includes("plot");
    }

    /**
     * Give map controller to toggle surface visibility
     *
     * @returns Map surface controller
     */
    public getController = (): Controller<MapVisibility> => this.controller;
}
