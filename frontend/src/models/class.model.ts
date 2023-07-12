import { Categorical } from "@/models/distribution/categorical.model";

export type ClassJSON =
    | string
    | {
          dist: Categorical;
      };

export class Class extends Categorical {
    constructor(type: ClassJSON) {
        const finalClass =
            typeof type === "string"
                ? {
                      mass: {
                          [type]: 100,
                      },
                  }
                : type.dist;
        super(finalClass as Categorical);
    }
}
