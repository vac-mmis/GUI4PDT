import type { PieData } from "plotly.js-dist-min";
import type { Categorical } from "@/services/dist.services";

const CLASSES = [
    "tetrapod",
    "reefcone",
    "reefring",
    "stone",
    "container",
    "bicycle",
    "effeltower",
] as const;

export type ClassJSON =
    | (typeof CLASSES)[number]
    | {
          dist: Categorical<(typeof CLASSES)[number]>;
      };

export class Class implements Partial<PieData> {
    values!: number[];
    labels!: string[];
    type: "pie";
    customdata: [number];

    constructor(objID: number, type?: ClassJSON) {
        this.type = "pie";
        this.customdata = [objID];
        if (type === undefined) {
            return;
        }
        if (typeof type === "string") {
            this.values = [100];
            this.labels = [type];
        } else {
            this.values = Object.values(type.dist.mass);
            this.labels = Object.keys(type.dist.mass);
        }
    }

    static copy(type: Class): Class {
        const copyType = new Class(type.customdata[0]);
        copyType.values = [...type.values];
        copyType.labels = [...type.labels];
        copyType.type = "pie";
        copyType.customdata = [...type.customdata];
        return copyType;
    }
}
