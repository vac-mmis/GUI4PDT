import type { Group } from "three";
import { loadMaterial } from "@/World/systems/loader";

import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export type MaterialFile = {
    name: string;
    albedo: string;
    ao: string;
    metalness: string;
    normal: string;
    roughness: string;
};

export const materialStore: any = defineStore("materials", () => {
    const _materials = ref([] as Group[]);

    const length = computed(() => _materials.value.length);

    const fetch = async () => {
        return axios
            .get("materials")
            .then(
                async (res) =>
                    await Promise.all(
                        res.data.map(async (material: MaterialFile) => loadMaterial(material))
                    )
            )
            .then((materials) => _materials.value.push(...materials));
    };

    function find(name: string): Group | undefined {
        return toRaw(_materials.value).find((material) => material.name === name);
    }

    return { length, fetch, find };
});
