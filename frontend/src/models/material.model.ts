import { MeshStandardMaterial } from "three";

import { Categorical } from "@/models/distribution/categorical.model";

export type MaterialJSON =
    | string
    | {
          dist: Categorical;
      };

export type MaterialFile = {
    name: string;
    albedo: string;
    ao: string;
    metalness: string;
    normal: string;
    roughness: string;
};

export class Material extends Categorical {
    constructor(type: MaterialJSON) {
        const finalMaterial =
            typeof type === "string"
                ? {
                      mass: {
                          [type]: 100,
                      },
                  }
                : type.dist;
        super(finalMaterial as Categorical);
    }

    public getMaterial = (materials: MeshStandardMaterial[]): MeshStandardMaterial => {
        const material = materials.find((m) => m.name === Object.keys(this.getMass())[0]);
        if (material === undefined) {
            return new MeshStandardMaterial();
        } else {
            return material;
        }
    };
}
