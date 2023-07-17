import { MeshStandardMaterial } from "three";

import { Categorical } from "@/models/distribution/categorical";
import type { PDTObject } from "@/models/object.model";

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

export class Material extends MeshStandardMaterial {
    declare parent: PDTObject;
    private dist: Categorical[];

    constructor(materialJSON: MaterialJSON[], materials?: MeshStandardMaterial[]) {
        super();
        this.dist = Categorical.uniformCatagories(materialJSON);

        if (!materials) {
            Object.assign(this, new MeshStandardMaterial());
        } else {
            const material = materials.find(
                (m) => m.name === Object.keys(this.dist[0].getMass())[0]
            );
            if (material) {
                Object.assign(this, material);
            } else {
                Object.assign(this, new MeshStandardMaterial());
            }
        }
    }

    public representation(t: number) {
        t = Math.trunc(t);
        return this.dist[t].representation();
    }

    public getMaterial(opacity: number = 1): MeshStandardMaterial {
        let material = new MeshStandardMaterial();
        material.copy(this as MeshStandardMaterial);
        if (opacity < 1) {
            material.transparent = true;
            material.opacity = opacity;
        }
        return material;
    }
}
