//import type { Categorical } from "@/models/dist.model";
import { MeshStandardMaterial } from "three";

const MATERIALS = ["concrete", "metal", "bicycle", "eiffeltower"] as const;

export type MaterialJSON = (typeof MATERIALS)[number]; //| Categorical<(typeof MATERIALS)[number]>;

export type MaterialFile = {
    name: string;
    albedo: string;
    ao: string;
    metalness: string;
    normal: string;
    roughness: string;
};

export const findMaterial = (materials: MeshStandardMaterial[], name: string) => {
    const material = materials.find((m) => m.name === name);
    if (material === undefined) {
        return new MeshStandardMaterial();
    } else {
        return material;
    }
};
