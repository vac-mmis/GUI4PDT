import type { VonMises } from "@/services/dist.services";

export type RotationJSON =
    | {
          roll: number;
          pitch: number;
          yaw: {
              distribution: VonMises;
          };
      }
    | [number, number, number];
