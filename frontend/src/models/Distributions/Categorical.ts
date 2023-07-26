/**
 * Implementation of categorical distribution.
 *
 * @module dist.categorical
 */

import type { PlotData } from "plotly.js-dist-min";

import { type Distribution } from "@/models/Distributions";

/**
 * Implementation of categorical distribution.
 *
 * @see {@link https://en.wikipedia.org/wiki/Categorical_distribution Categorical distribution on Wikipedia}
 */
export class Categorical implements Distribution {
    /** values and their probabilities. */
    type = "categorical";
    private mass: Record<string, number>;

    /**
     *  Creates new categorical distribution from given distribution data.
     *
     * @param categorical Categorical distribution data or string of absolute category.
     */
    constructor(dist?: Categorical | string) {
        if (typeof dist === "string") {
            this.mass = { [dist]: 100 };
        } else {
            this.mass = dist?.mass || {};
        }
    }

    public getType = () => this.type;

    public random(): [string, number] {
        return Object.entries<number>(this.mass)[0];
    }

    public getMass = (): Record<string, number> => this.mass;

    public getMean = (): [string, number] => Object.entries<number>(this.mass)[0];

    public setMean(newMean: number[]): void {
        return;
    }

    public setMass(newMass: Record<string, number>): void {
        this.mass = newMass;
    }

    /**
     * @returns Categorical representation as Plotly.JS pie chart.
     */
    public representation(): Partial<PlotData> {
        return {
            type: "pie",
            values: Object.values(this.mass),
            labels: Object.keys(this.mass),
        };
    }

    /**
     * Uniforms categorical array or string to have all available keys in each categorical item.
     *
     * @param categories Array of string or categorical data to uniform.
     *
     * @returns Uniformed categorical distribution array.
     */
    public static uniformCatagories(categories: (string | { dist: Categorical })[]): Categorical[] {
        const types = new Set<string>();
        const uniformed = [] as Categorical[];
        // Create categorical array from data and save all possible types.
        categories.forEach((item) => {
            if (typeof item === "string") {
                uniformed.push(new Categorical(item));
                types.add(item);
            } else {
                const res = new Categorical(item.dist);
                const keys = Object.keys(res.getMass());
                keys.forEach((key) => types.add(key));
                uniformed.push(res);
            }
        });

        // Assign probability to all possible materials saved in `types` (0 is not exist).
        return uniformed.map((dist) => {
            const res = Array.from(types).reduce(
                (o, key) =>
                    Object.assign(o, { [key]: dist.getMass()[key] ? dist.getMass()[key] : 0 }),
                {}
            );
            dist.setMass(res);
            return dist;
        });
    }
}
