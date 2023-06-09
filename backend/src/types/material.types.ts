const MATERIALS = ["concrete"] as const;

type Mass = Record<(typeof MATERIALS)[number], number>;

export type MaterialType = {
    representation: "categorical";
    mass: Mass;
};
