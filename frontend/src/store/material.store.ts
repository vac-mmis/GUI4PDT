/**
 * Stores and loads available material provided by backend API.
 *
 * @module Store.Material
 */
import type { MeshStandardMaterial } from "three";
import { loadMaterial } from "@/World/systems/loader";

import { ref, computed, toRaw } from "vue";
import { defineStore } from "pinia";


import type { MaterialFile } from "@/interfaces/assets";

/**
 * Material store handle by Pinia.
 */
export const materialStore: any = defineStore("materials", () => {
    const _materials = ref([] as MeshStandardMaterial[]);

    /** Number of fetched material.  */
    const length = computed(() => _materials.value.length);

    /**
     * Fetch, load and store materials from backend API.
     */
    const fetchLocal = async () => {
        try {
            const response = await fetch('saveData.json');
            const data = await response.json();
            const materialData = data["materials"];
            
            const materials = await Promise.all(materialData.map(async (material: MaterialFile) => loadMaterial(material)));
            _materials.value.push(...materials)
        } catch (err) {
            console.error("Error loading local material data:", err);
        }
    };

    /**
     * Returns desired material from storage with given name.
     *
     * @param name Desired material name.
     *
     * @returns Desired material.
     */
    function find(name: string): MeshStandardMaterial | undefined {
        return toRaw(_materials.value).find((material) => material.name === name);
    }

    return { length, fetchLocal, find };
});
