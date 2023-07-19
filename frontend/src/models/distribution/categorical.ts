import type { PlotData } from "plotly.js-dist-min";

import { Distribution } from "@/models/distribution/dist";

export class Categorical extends Distribution {
    private mass: Record<string, number>;

    constructor(type?: Categorical) {
        super("categorical");
        this.mass = type?.mass || {};
    }

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

    public representation(): Partial<PlotData> {
        return {
            type: "pie",
            values: Object.values(this.mass),
            labels: Object.keys(this.mass),
        };
    }

    public static uniformCatagories(
        categories: (
            | string
            | {
                  dist: Categorical;
              }
        )[]
    ): Categorical[] {
        const types = new Set<string>();
        const uniformed = [] as Categorical[];
        categories.forEach((item) => {
            if (typeof item === "string") {
                uniformed.push(
                    new Categorical({
                        mass: {
                            [item]: 100,
                        },
                    } as unknown as Categorical)
                );
                types.add(item);
            } else {
                const res = new Categorical(item.dist);
                const keys = Object.keys(res.getMass());
                keys.forEach((key) => types.add(key));
                uniformed.push(res);
            }
        });

        // Assign probability to all possible materials (0 is not exist)
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
