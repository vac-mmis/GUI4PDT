export type LocationType =
    | {
          distribution: {
              representation: "multivariate-normal";
              mean: [number, number, number];
              covariance: [
                  [number, number, number],
                  [number, number, number],
                  [number, number, number]
              ];
          };
      }
    | {
          distribution: {
              representation: "uniform-continous";
              "x-min": number;
              "x-max": number;
              "y-min": number;
              "y-max": number;
              "z-min": number;
              "z-max": number;
          };
      };
