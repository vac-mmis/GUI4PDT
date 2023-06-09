export type RotationType =
    | {
          roll: number;
          pitch: number;
          yaw: {
              distribution: {
                  representation: "von-mises";
                  mean: number;
                  dispersion: number;
              };
          };
      }
    | [number, number, number];
