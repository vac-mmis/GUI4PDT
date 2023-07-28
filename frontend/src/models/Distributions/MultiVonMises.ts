/**
 * Implementation of multivariate Von Mises distribution.
 *
 * @module dist.multiVonMises
 */

import { type Distribution, MultivariateNormal } from "@/models/Distributions";

/**
 * Implementation of multivariate Von Mises distribution.
 *
 * @remark Could be use at any dimension.
 *
 * @see {@link https://en.wikipedia.org/wiki/Von_Mises_distribution Von Mises distribution on Wikipedia}
 */
export class MultivariateVonMises implements Distribution {
    /** Distribution class name */
    static distName = "von-mises";
    type = MultivariateVonMises.distName;

    private mean: number[];
    /** Concentration */
    private kappa: number[];

    /**
     * Creates new multivariate Von Mises distribution from given distribution data.
     *
     * @param dist Multivariate Von Mises distribution data with mean and concentration.
     * @param units Set `dist` angle units to enable conversion to radians (default :`"rad"`).
     */
    constructor(dist: MultivariateVonMises, units: "rad" | "deg" = "rad") {
        // Converts degrees to radians if needed.
        switch (units) {
            case "deg":
                this.mean = dist.mean.map((angle) => (Math.PI * angle) / 180);
                break;
            default:
                this.mean = dist.mean;
                break;
        }
        this.kappa = dist.kappa;
    }

    public getType = () => this.type;

    public getMean = () => this.mean;

    public setMean(newMean: number[]): void {
        this.mean = newMean;
    }

    /**
     * Draw random number from Von Mises distribution.
     *
     * @remark Implementation comes from {@link https://numpy.org/doc/stable/reference/random/generated/numpy.random.Generator.vonmises.html | NumPy Von Mises random generator}.
     * @param mu Von Mises mean.
     * @param kappa Von Mises concentration values.
     *
     * @see {@link https://github.com/numpy/numpy/blob/511f77d1202b5f23ca7e8988d9455e803d5303d6/numpy/random/src/distributions/distributions.c#L837 | NumPy Von Mises generator implementation}
     */
    private static randomVonMises(mu: number, kappa: number): number {
        let s: number;
        let U: number, V: number, W: number, Y: number, Z: number;
        let result: number, mod: number;

        if (isNaN(kappa)) {
            return NaN;
        }

        if (kappa < 1e-8) {
            // Use a uniform distribution for very small values of kappa
            return Math.PI * (2 * Math.random() - 1);
        } else if (kappa < 1e-5) {
            // Second-order Taylor expansion around kappa = 0
            s = 1 / kappa + kappa;
        } else if (kappa <= 1e6) {
            // Path for 1e-5 <= kappa <= 1e6
            const r = 1 + Math.sqrt(1 + 4 * kappa * kappa);
            const rho = (r - Math.sqrt(2 * r)) / (2 * kappa);
            s = (1 + rho * rho) / (2 * rho);
        } else {
            // Fallback to wrapped normal distribution for kappa > 1e6
            result = mu + Math.sqrt(1 / kappa) * MultivariateNormal.randomGauss();
            // Ensure result is within bounds
            if (result < -Math.PI) {
                result += 2 * Math.PI;
            } else if (result > Math.PI) {
                result -= 2 * Math.PI;
            }
            return result;
        }

        while (true) {
            U = Math.random();
            Z = Math.cos(Math.PI * U);
            W = (1 + s * Z) / (s + Z);
            Y = kappa * (s - W);
            V = Math.random();

            if (Y * (2 - Y) - V >= 0 || Math.log(Y / V) + 1 - Y >= 0) {
                break;
            }
        }

        U = Math.random();
        result = U < 0.5 ? -Math.acos(W) : Math.acos(W);
        result += mu;
        mod = ((Math.abs(result) + Math.PI) % (2 * Math.PI)) - Math.PI;

        return result < 0 ? -mod : mod;
    }

    public random(relative: boolean = false): number[] {
        return this.kappa.map((k, i) =>
            MultivariateVonMises.randomVonMises(relative ? 0 : this.mean[i], k)
        );
    }

    /**
     * Give flatten `N` vectors from distribution.
     *
     * @param N Number of vectors to draw.
     * @param relative If true, draw with centered mean (null vector).
     *
     * @returns Array of N flatten vectors drawn from distribution
     * */
    private randomN(N: number = 1, relative: boolean = false): number[] {
        return Array.from({ length: N }, () => this.random(relative)).flat();
    }

    /**
     * Build 1000 vectors drawn from distribution.
     *
     * Data format : `[x0,y0,z0, x1,y1,z1, ..., x1000,y1000,z1000]`
     *
     * @param relative If `true`, create representation data with centered mean.
     *
     * @returns Von Mises representation as 1000 flatten vectors.
     */
    public representation(relative: boolean = false): number[] {
        return this.randomN(1000, relative);
    }
}
