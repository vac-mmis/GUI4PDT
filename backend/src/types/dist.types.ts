export type MultivariateNormal = {
    type: "multivariate-normal";
    mean: [number, number, number];
    cov: [[number, number, number], [number, number, number], [number, number, number]];
};

export type UniformContinuous = {
    type: "uniform-continous";
    params: number[][];
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
