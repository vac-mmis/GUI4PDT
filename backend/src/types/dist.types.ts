export type MultivariateNormal = {
    representation: "multivariate-normal";
    mean: [number, number, number];
    covariance: [[number, number, number], [number, number, number], [number, number, number]];
};

export type UniformContinuous = {
    representation: "uniform-continous";
    "x-min": number;
    "x-max": number;
    "y-min": number;
    "y-max": number;
    "z-min": number;
    "z-max": number;
};

export type Categorical<E extends string> = {
    representation: "categorical";
    mass: Record<E, number>;
};

export type VonMises = {
    representation: "von-mises";
    mean: number;
    dispersion: number;
};
