export abstract class Distribution implements Distribution {
    type: string;

    constructor(type: string) {
        this.type = type;
    }

    public getType = () => this.type;

    public abstract getMean(): number[];

    public abstract setMean(newMean: number[]): void;

    public abstract random(): number[];

    public abstract representation(): number[];
}
