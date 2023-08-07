/**
 * Stores and loads available models provided by backend API.
 *
 * @module material.store
 */
import type { Group } from "three";
import { loadModel } from "@/World/systems/loader";

import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

/**
 * Model file format provided by the backend API.
 */
export type ModelFile = {
    name: string;
    content: string;
};

/**
 * Model store handle by Pinia.
 */
export const modelStore: any = defineStore("models", () => {
    const _models = ref([] as Group[]);

    /** Number of fetched material.  */
    const length = computed(() => _models.value.length);

    /**
     * Fetch, load and store models from backend API.
     */
    const fetch = async () => {
        await axios
            .get("models")
            .then(
                async (res) =>
                    await Promise.all(res.data.map(async (model: ModelFile) => loadModel(model)))
            )
            .then((models) => _models.value.push(...models));
    };

    /**
     * Returns desired model from storage with given name.
     *
     * @param name Desired model name.
     *
     * @returns Desired model.
     */
    function find(name: string): Group | undefined {
        return toRaw(_models.value).find((model) => model.name === name);
    }

    return { length, fetch, find };
});
