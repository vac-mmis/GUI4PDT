const ELEMENTS = ["tetrapod", "reefcone", "reefring", "stone"] as const;

type Mass = Record<(typeof ELEMENTS)[number], number>;

export type ElementType =
    | {
          distribution: {
              representation: "categorical";
              mass: Mass;
          };
      }
    | (typeof ELEMENTS)[number];
