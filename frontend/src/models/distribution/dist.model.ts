export abstract class Distribution implements Distribution {
    private type: string;

    constructor(type: string) {
        this.type = type;
    }

    public getType = () => this.type;

    public abstract getMean(): any;

    public abstract setMean(newMean: number[]): void;

    public abstract random(): any;

    public abstract representation(): any;
}
