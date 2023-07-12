export type Categorical<E extends string> = {
    type: "categorical";
    mass: Record<E, number>;
};
