import type {
    MultivariateNormal,
    UniformContinuous,
    Categorical,
    VonMises,
} from "../types/dist.types";

const CLASSES = [
    "tetrapod",
    "reefcone",
    "reefring",
    "stone",
    "container",
    "bicycle",
    "effeltower",
] as const;
const MATERIALS = ["concrete", "metal", "bicycle", "eiffeltower"] as const;

export type ClassJSON =
    | (typeof CLASSES)[number]
    | {
          dist: Categorical<(typeof CLASSES)[number]>;
      };

export type LocationJSON =
    | {
          dist: MultivariateNormal | UniformContinuous;
      }
    | [number, number, number];

export type RotationJSON =
    | {
          roll: number;
          pitch: number;
          yaw: {
              dist: VonMises;
          };
      }
    | [number, number, number];

export type MaterialJSON = Categorical<(typeof MATERIALS)[number]>;

export type ObjectTimestamp = {
    id: number;
    class: ClassJSON;
    location: LocationJSON;
    rotation?: RotationJSON;
    material: MaterialJSON;
    scale?: number;
    physics?: boolean;
};

export type ObjectJSON = {
    id: number;
    class: ClassJSON[];
    location: LocationJSON[];
    material: MaterialJSON[];
    rotation: (RotationJSON | undefined)[];
    scale: (number | undefined)[];
    physics: (boolean | undefined)[];
};
