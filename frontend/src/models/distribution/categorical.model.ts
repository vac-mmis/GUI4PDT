import type { PlotData } from "plotly.js-dist-min";

import { Distribution } from "@/models/distribution/dist.model";

export class Categorical extends Distribution {
    private mass: Record<string, number>;

    constructor(type: Categorical) {
        super("categorical");
        this.mass = type.mass;
    }

    public random(): [string, number] {
        return Object.entries<number>(this.mass)[0];
    }

    public getMass = (): Record<string, number> => this.mass;

    public getMean = (): [string, number] => Object.entries<number>(this.mass)[0];

    public setMean(newMean: number[]): void {}

    public representation(): Partial<PlotData> {
        return {
            type: "pie",
            values: Object.values(this.mass),
            labels: Object.keys(this.mass),
        };
    }
}
