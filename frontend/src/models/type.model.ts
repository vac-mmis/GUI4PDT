import type { PieData } from "plotly.js-dist-min";
import type { Categorical } from "@/services/dist.services";

const TYPES = ["tetrapod", "reefcone", "reefring", "stone"] as const;

export type TypeJSON =
    | (typeof TYPES)[number]
    | {
          distribution: Categorical<(typeof TYPES)[number]>;
      };

export class Type implements Partial<PieData> {
    values!: number[];
    labels!: string[];
    type: "pie";
    customdata: [number];

    constructor(objID: number, type?: TypeJSON) {
        this.type = "pie";
        this.customdata = [objID];
        if (type === undefined) {
            return;
        }
        if (typeof type === "string") {
            this.values = [100];
            this.labels = [type];
        } else {
            this.values = Object.values(type.distribution.mass);
            this.labels = Object.keys(type.distribution.mass);
        }
    }

    static copy(type: Type): Type {
        const copyType = new Type(type.customdata[0]);
        copyType.values = [...type.values];
        copyType.labels = [...type.labels];
        copyType.type = "pie";
        copyType.customdata = [...type.customdata];
        return copyType;
    }
}
