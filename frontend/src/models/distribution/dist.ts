export abstract class Distribution implements Distribution {
    type: string;

    constructor(type: string) {
        this.type = type;
    }

    public getType = () => this.type;

    public abstract getMean(): any;

    public abstract setMean(newMean: number[]): void;

    public abstract random(relative?: boolean): any;

    public abstract representation(relative?: boolean): any;
}
