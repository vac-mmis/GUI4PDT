import { Group } from "three";

import { Categorical } from "@/models/distribution/categorical";
import type { PDTObject } from "@/models/object.model";
import { Material } from "@/models/material.model";
import { ObjectRepresentation } from "./representation/object";

export type ClassJSON =
    | string
    | {
          dist: Categorical;
      };

export class Class extends Group {
    declare parent: PDTObject;
    private dist: Categorical[];
    private scaleFactor: (number | undefined)[];

    constructor(
        parent: PDTObject,
        classJSON: ClassJSON[],
        material: Material,
        scale: (number | undefined)[],
        models?: Group[]
    ) {
        super();
        this.parent = parent;
        this.userData.type = "Class";
        this.dist = Categorical.uniformCatagories(classJSON);
        this.scaleFactor = scale;

        // Create object representation
        if (!models) {
            this.add(ObjectRepresentation.emptyObject([0, 0, 0]));
        } else {
            const object = Object.entries(this.dist[0].getMass())
                .map((type: [string, number]) => {
                    const model = models.find((m) => m.name === type[0]);
                    if (model === undefined) {
                        return undefined;
                    } else {
                        return new ObjectRepresentation(
                            model,
                            material,
                            [0, 0, 0],
                            this.scaleFactor[0],
                            type[1]
                        );
                    }
                })
                .filter((model): model is ObjectRepresentation => model !== undefined);
            this.add(...object);
        }
    }

    public update(t: number) {
        t = Math.trunc(t);
        this.children.forEach((type) => {
            (type as ObjectRepresentation).update(
                this.dist[t].getMass()[type.name],
                this.scaleFactor[t]
            );
        });
    }

    public representation(t: number) {
        t = Math.trunc(t);
        return this.dist[t].representation();
    }
}
