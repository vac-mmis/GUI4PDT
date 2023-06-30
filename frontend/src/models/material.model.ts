import type { Categorical } from "@/services/dist.services";

const MATERIALS = ["concrete", "metal", "bicycle", "eiffeltower"] as const;

export type MaterialJSON = Categorical<(typeof MATERIALS)[number]>;
