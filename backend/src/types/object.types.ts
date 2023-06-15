import type {
    MultivariateNormal,
    UniformContinuous,
    Categorical,
    VonMises,
} from "../types/dist.types";

const ELEMENTS = ["tetrapod", "reefcone", "reefring", "stone"] as const;
const MATERIALS = ["concrete"] as const;

type ElementJSONType =
    | (typeof ELEMENTS)[number]
    | {
          distribution: Categorical<(typeof ELEMENTS)[number]>;
      };

type LocationJSONType = {
    distribution: MultivariateNormal | UniformContinuous;
};

type RotationJSONType =
    | {
          roll: number;
          pitch: number;
          yaw: {
              distribution: VonMises;
          };
      }
    | [number, number, number];

type MaterialJSONType = Categorical<(typeof MATERIALS)[number]>;

export type ObjectJSONType = {
    id: number;
    type: ElementJSONType;
    location: LocationJSONType;
    rotation: RotationJSONType;
    material: MaterialJSONType;
    scale: [number, number, number];
};
