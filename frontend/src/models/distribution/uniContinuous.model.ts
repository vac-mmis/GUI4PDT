import { mean } from "mathjs";

import { Distribution } from "@/models/distribution/dist.model";

export class UniformContinuous extends Distribution implements UniformContinuous {
    private mean: number[];
    params: number[][];

    constructor(dist: UniformContinuous) {
        super("uniform-continuous");
        this.params = dist.params;
        this.mean = dist.params.map((p) => mean(p));
    }

    public getMean = () => this.mean;

    public setMean(newMean: number[]): void {
        const diff = newMean.map((x, i) => x - this.mean[i]);
        this.mean = newMean;
        this.params = this.params.map((p, i) => [p[0] + diff[i], p[1] + diff[i]]);
    }

    public random(): number[] {
        return this.params.map((p) => p[0] + (p[1] - p[0]) * Math.random());
    }

    public representation(): number[] {
        return this.params.map((p) => p[1] - p[0]);
    }
}
