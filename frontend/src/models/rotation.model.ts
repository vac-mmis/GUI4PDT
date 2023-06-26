import type { VonMises } from "../types/dist.types";

export type RotationJSON =
    | {
          roll: number;
          pitch: number;
          yaw: {
              distribution: VonMises;
          };
      }
    | [number, number, number];
