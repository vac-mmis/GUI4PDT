import { Distribution } from "@/models/distribution/dist";
import { MultivariateNormal } from "@/models/distribution/multiNormal";

export class MultivariateVonMises extends Distribution {
    private mean: number[];
    private kappa: number[];

    constructor(dist: MultivariateVonMises, units: "rad" | "deg" = "rad") {
        super("multivariate-von-mises");

        // converts degrees to radians if needed
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

    public getMean = () => this.mean;

    public setMean(newMean: number[]): void {
        this.mean = newMean;
    }

    private randomVonMises(mu: number, kappa: number): number {
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
        return this.kappa.map((k, i) => this.randomVonMises(relative ? 0 : this.mean[i], k));
    }

    private randomN(numPoints: number = 1, relative: boolean = false): number[] {
        return Array.from({ length: numPoints }, () => this.random(relative)).flat();
    }

    public representation(relative: boolean = false): number[] {
        return this.randomN(1000, relative);
    }
}
