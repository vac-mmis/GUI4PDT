/**
 * Implementation of object class (what kind of object it could be).
 *
 * @module object.class
 */

import { Euler, Group } from "three";
import type { PlotData } from "plotly.js-dist-min";

import { Categorical } from "@/models/Distributions";
import type { PDTObject } from "@/models/object.model";
import { Material } from "@/models/Properties";
import { makeRepresentation, type ObjectRepresentation } from "@/models/Representations";

import { modelStore } from "@/store/model.store";

/**
 * Class data type, following the backend API data format.
 */
export type ClassJSON = string | { dist: Categorical };

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
        const models = modelStore();
        const object = Object.entries(this.dist[0].getMass()).map((type: [string, number]) =>
            makeRepresentation(
                "object",
                models.find(type[0]),
                material?.getMaterial(type[1]) || undefined,
                undefined,
                this.scaleFactor[0],
                type[1]
            )
        );
        this.add(...object);
    }

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
     * Get Euler rotation vector of the object class.
     *
     * @returns Euler rotation vector of the object class rotation.
     */
    public getRotation = (): Euler => this.children[0].rotation;

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
