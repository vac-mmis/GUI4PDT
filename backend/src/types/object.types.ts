import type { MultivariateNormal, UniformContinuous, Categorical, VonMises } from "./dist.types";

const ELEMENTS = ["tetrapod", "reefcone", "reefring", "stone"] as const;
const MATERIALS = ["concrete"] as const;

type ElementType =
    | { distribution: Categorical<(typeof MATERIALS)[number]> }
    | (typeof ELEMENTS)[number];

type LocationType = {
    distribution: MultivariateNormal | UniformContinuous;
};

type RotationType =
    | {
          roll: number;
          pitch: number;
          yaw: {
              distribution: VonMises;
          };
      }
    | [number, number, number];

export type PDTObjectType = {
    id: number;
    type: ElementType;
    location: LocationType;
    rotation: RotationType;
    scale: [number, number, number];
    material: Categorical<(typeof MATERIALS)[number]>;
};
