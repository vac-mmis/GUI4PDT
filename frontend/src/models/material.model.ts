import type { Categorical } from "@/services/dist.services";

const MATERIALS = ["concrete"] as const;

export type MaterialJSON = Categorical<(typeof MATERIALS)[number]>;
