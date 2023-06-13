import type {
    MultivariateNormal,
    UniformContinuous,
    Categorical,
    VonMises,
} from "../types/dist.types";

export const ELEMENTS = ["tetrapod", "reefcone", "reefring", "stone"] as const;
const MATERIALS = ["concrete"] as const;

export type ElementJSONType =
    | (typeof ELEMENTS)[number]
    | {
          distribution: Categorical<(typeof ELEMENTS)[number]>;
      };

export type LocationJSONType = {
    distribution: MultivariateNormal | UniformContinuous;
};

export type RotationJSONType =
    | {
          roll: number;
          pitch: number;
          yaw: {
              distribution: VonMises;
          };
      }
    | [number, number, number];

export type MaterialJSONType = Categorical<(typeof MATERIALS)[number]>;

export type ObjectJSONType = {
    type: ElementJSONType;
    location: LocationJSONType;
    rotation: RotationJSONType;
    material: MaterialJSONType;
};
