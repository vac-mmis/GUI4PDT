/**
 * Implementation of object class (what kind of object it could be).
 *
 * @module object.class
 */

import { type Euler, Group } from "three";
import type { PlotData } from "plotly.js-dist-min";

import { Controller } from "@/models/Controls/Controller";
import { Categorical } from "@/models/Distributions";
import { Material } from "@/models/Properties";
import type { PDTObject } from "@/models/object.model";
import { makeRepresentation, type ObjectRepresentation } from "@/models/Representations";

import modelStore from "@/store/model.store";

/**
 * Class data type, following the backend API data format.
 */
export type ClassJSON = string | { dist: Categorical };

const ClassVisibilities = ["visible", "alpha"] as const;
type ClassVisibility = (typeof ClassVisibilities)[number];

/**
 * Implements representation of object classes.
 *
 * @remark Object class is the distribution of what kind of object it is. Here, this distribution is represented in the 3D scene objects melting with proportional opacity according to probability.
 */
export class Class extends Group {
    /** Object which has this class. */
    declare parent: PDTObject;
    /** Class distribution through time. */
    private dist: Categorical[];
    /** Object scale through time. */
    private scaleFactor: (number | undefined)[];

    /** `true` if location is shows as probabilistic */
    private visibility: ClassVisibility[] = ["visible", "alpha"];
    /** Location controller module  */
    private controller: Controller<ClassVisibility>;

    /**
     * Creates object class representation.
     *
     * @param parent Object which has this class.
     * @param classJSON Object class data through time.
     * @param material Object material distribution.
     * @param scale Object scale through time.
     */
    constructor(
        parent: PDTObject,
        classJSON: ClassJSON[],
        material: Material | undefined,
        scale: (number | undefined)[]
    ) {
        super();
        this.parent = parent;
        this.userData.type = "Class";
        this.dist = Categorical.uniformCatagories(classJSON);
        this.scaleFactor = scale;

        // Create object representation
        const object = Object.entries(this.dist[0].getMass()).map((type: [string, number]) =>
            makeRepresentation(
                "object",
                modelStore().find(type[0]),
                material?.getMaterial(type[1]) ?? undefined,
                this.scaleFactor[0],
                type[1]
            )
        );
        this.add(...object);

        // init controller
        this.controller = new Controller<ClassVisibility>(
            "class",
            ClassVisibilities,
            "Class",
            () => this.getVisibility(),
            (visibility) => this.setVisibility(visibility)
        );
    }

    /**
     * Get actual class visibility
     *
     * @returns Class visibility
     */
    private getVisibility = (): ClassVisibility[] => this.visibility;

    /**
     * Set class visibility
     *
     * @param visibility Desired class visibility
     */
    private setVisibility(visibility: ClassVisibility[]) {
        this.visibility = visibility;
        if (!visibility.includes("visible")) {
            this.visible = false;
        } else {
            this.visible = true;
            this.updateClass(this.parent.getTimeIndex());
        }
    }

    /**
     * Give class controller to toggle object visibility
     *
     * @returns Class controller
     */
    public getController = (): Controller<ClassVisibility> => this.controller;

    /**
     * Update object class at given index.
     *
     * @param index Time index to update class.
     */
    private updateClass(index: number): void {
        const visibility = this.visibility;
        const dist = this.dist[index];
        function getOpacity(type: ObjectRepresentation) {
            if (visibility.includes("alpha")) {
                return dist.getMass()[type.name];
            } else {
                const absolute = Object.entries(dist.getMass()).sort((a, b) => b[1] - a[1])[0][0];
                return type.name === absolute ? 1 : 0;
            }
        }

        (this.children as ObjectRepresentation[]).forEach((type) => {
            type.update(getOpacity(type), this.scaleFactor[index]);
        });
    }

    /**
     * Update class representation at desired time.
     *
     * @param time Time to update class.
     */
    public update(time?: number): void {
        const index = time ? Math.trunc(time) : this.parent.getTimeIndex();
        if (Math.abs(index - this.parent.getTimeIndex()) >= 1) {
            // update class
            this.updateClass(index);
        }
    }

    /**
     * Change rotation of object representation.
     *
     * @param e Euler vector representing angles to apply for rotation.
     */
    public setRotation(e: Euler): void {
        this.children.forEach((type) => {
            (type as ObjectRepresentation).setRotationFromEuler(e);
        });
    }

    /**
     * Get object class representation at desired time.
     *
     * @param t Desired representation time index.
     *
     * @returns Class distribution representation as Plotly.JS pie chart.
     */
    public representation(t: number): Partial<PlotData> {
        t = Math.trunc(t);
        const data = this.dist[t].representation();
        return {
            type: "pie",
            values: data.filter((_, i) => i % 2 == 1),
            labels: data.filter((_, i) => i % 2 == 0),
        };
    }
}
