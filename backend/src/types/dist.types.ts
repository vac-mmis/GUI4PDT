export type MultivariateNormal = {
    type: "multivariate-normal";
    mean: [number, number, number];
    cov: [[number, number, number], [number, number, number], [number, number, number]];
};

export type UniformContinuous = {
    type: "uniform-continous";
    "x-min": number;
    "x-max": number;
    "y-min": number;
    "y-max": number;
    "z-min": number;
    "z-max": number;
};

export type Categorical<E extends string> = {
    type: "categorical";
    mass: Record<E, number>;
};

export type VonMises = {
    type: "von-mises";
    mean: number;
    dispersion: number;
};
