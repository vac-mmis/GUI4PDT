/**
 * Implementation of object class (what kind of object it could be).
 *
 * @module Object.Class
 */

import { type Euler, Group } from "three";
import type { PlotData } from "plotly.js-dist-min";

import { Controller } from "@/models/Controls/Controller";
import { Material } from "@/models/Properties";
import type { ClassJSON } from "@/interfaces/properties";

import { type Categorical, uniformCatagories } from "@/models/Distributions/Categorical";
import { type Distribution, makeDistribution } from "@/models/Distributions";

import type { PDTObject } from "@/models/object.model";
import { makeRepresentation, type ObjectRepresentation } from "@/models/Representations";

import { modelStore } from "@/store/model.store";


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
    readonly dist: Distribution[];
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
        this.scaleFactor = scale;

        // Uniform and store class distributions
        this.dist = uniformCatagories(classJSON).map((type) => makeDistribution(type));

        // Create object representation
        const object = Object.entries((this.dist[0] as Categorical).mass).map(
            (type: [string, number]) =>
            
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
        const dist = this.dist[index] as Categorical;
        function getOpacity(type: ObjectRepresentation) {
            if (visibility.includes("alpha")) {
                return dist.mass[type.name];
            } else {
                return type.name === dist.getMode()[0] ? 1 : 0;
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
            values: data.filter((_: any, i: number) => i % 2 == 1),
            labels: data.filter((_: any, i: number) => i % 2 == 0),
        };
    }

    /**
     * Get actual class visibility
     *
     * @returns Class scaleFactor
     */
    public getScaleFactor = (): (any)[] => this.scaleFactor;
}
