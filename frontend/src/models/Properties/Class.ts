/**
 * Implementation of object class (what kind of object it could be).
 *
 * @module object.class
 */

import { Euler, Group } from "three";
import type { PlotData } from "plotly.js-dist-min";

import { Controller } from "@/models/Controls/Controller";
import { Categorical } from "@/models/Distributions";
import type { PDTObject } from "@/models/object.model";
import { Material } from "@/models/Properties";
import { makeRepresentation, type ObjectRepresentation } from "@/models/Representations";

import { modelStore } from "@/store/model.store";

/**
 * Class data type, following the backend API data format.
 */
export type ClassJSON = string | { dist: Categorical };

const ClassVisibilities = ["invisible", "prob"] as const;
export type ClassVisibility = (typeof ClassVisibilities)[number];

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
    private visibility: ClassVisibility;
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
        this.visibility = "prob";
        this.dist = Categorical.uniformCatagories(classJSON);
        this.scaleFactor = scale;

        // Create object representation
        const models = modelStore();
        const object = Object.entries(this.dist[0].getMass()).map((type: [string, number]) =>
            makeRepresentation(
                "object",
                models.find(type[0]),
                material?.getMaterial(type[1]) ?? undefined,
                undefined,
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
    private getVisibility = (): ClassVisibility => this.visibility;

    /**
     * Set class visibility
     *
     * @param visibility Desired class visibility
     */
    private setVisibility(visibility: ClassVisibility) {
        this.visibility = visibility;
        switch (visibility) {
            case "invisible":
                this.visible = false;
                break;
            default:
                this.visible = true;
                break;
        }
    }

    /**
     * Give class controller to toggle object visibility
     *
     * @returns Class controller
     */
    public getController = () => this.controller;

    /**
     * Update class representation at desired time.
     *
     * @param time Time to update class.
     */
    public update(time: number) {
        const index = Math.trunc(time);
        if (Math.abs(index - this.parent.getTimeIndex()) >= 1) {
            // update class
            this.children.forEach((type) => {
                (type as ObjectRepresentation).update(
                    this.dist[index].getMass()[type.name],
                    this.scaleFactor[index]
                );
            });
        }
    }

    /**
     * Change rotation of object representation.
     *
     * @param e Euler vector representing angles to apply for rotation.
     */
    public setRotation(e: Euler) {
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
