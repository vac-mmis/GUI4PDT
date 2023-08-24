/**
 * Implementation of categorical distribution.
 *
 * @module Distribution.Categorical
 */

import type { CatJSON } from "@/interfaces/distribution";
/**
 * Implementation of categorical distribution.
 *
 * @see {@link https://en.wikipedia.org/wiki/Categorical_distribution Categorical distribution on Wikipedia}
 */
export class Categorical implements CatJSON {
    /** Distribution class name */
    static distName = "categorical" as const;

    readonly type = Categorical.distName;
    readonly mass: Record<string, number>;
    private mode: [string, number];
    /**
     *  Creates new categorical distribution from given distribution data.
     *
     * @param categorical Categorical distribution data or string of absolute category.
     */
    constructor(dist?: CatJSON | string) {
        if (typeof dist === "string") {
            this.mass = { [dist]: 1 };
        } else {
            this.mass = dist?.mass ?? {};
        }
        this.mode = Object.entries<number>(this.mass).sort((a, b) => b[1] - a[1])[0];
    }

    public random(): [string, number] {
        return Object.entries<number>(this.mass)[0];
    }

    public getMode = (): [string, number] => this.mode;

    /**
     * @returns Categorical representation as [string, number,...] array.
     */
    public representation(): (string | number)[] {
        return Object.entries(this.mass).flat();
    }

    /**
     * Uniforms categorical array or string to have all available keys in each categorical item.
     *
     * @param categories Array of string or categorical data to uniform.
     *
     * @returns Uniformed categorical distribution array.
     */
    public static uniformCatagories(categories: (string | { dist: CatJSON })[]): Categorical[] {
        const classes = new Set<string>();
        const uniformedMass = [] as Record<string, number>[];
        // Create categorical array from data and save all possible types.
        categories.forEach((item) => {
            if (typeof item === "string") {
                classes.add(item);
                uniformedMass.push({ [item]: 1 });
            } else {
                Object.keys(item.dist.mass).forEach((key) => classes.add(key));
                uniformedMass.push(item.dist.mass);
            }
        });

        // Assign probability to all possible materials saved in `types` (0 is not exist).
        return uniformedMass.map(
            (mass) =>
                new Categorical({
                    type: "categorical",
                    mass: Array.from(classes).reduce(
                        (o, key) => Object.assign(o, { [key]: mass[key] ? mass[key] : 0 }),
                        {}
                    ),
                })
        );
    }
}
