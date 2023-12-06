/**
 * Stores and loads available models provided by backend API.
 *
 * @module Store.Models
 */
import { BoxGeometry, Mesh, MeshStandardMaterial, Group } from "three";
import { loadModel } from "@/World/systems/loader";

import { ref, computed, toRaw } from "vue";
import { defineStore } from "pinia";


import type { ModelFile } from "@/interfaces/assets";

/**
 * Model store handle by Pinia.
 */
export const modelStore: any = defineStore("models", () => {
    const _models = ref([] as Group[]);
    /** Default model */
    const _default = computed(() => {
        const group = new Group();
        group.add(new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial()));
        return group;
    });

    /** Number of fetched material.  */
    const length = computed(() => _models.value.length);

    /**
     * Gives a copy of default model.
     *
     * @param name Desired default model name.
     *
     * @return A default model.
     */
    function getDefault(name?: string): Group {
        const defaultModel = toRaw(_default.value.clone());
        defaultModel.name = name ?? "default";
        return defaultModel;
    }

    /**
     * Fetch, load and store models from backend API.
     */
    const fetchLocal = async () => {
        try {
            const response = await fetch('saveData.json');
            const data = await response.json();
            const modelData = data["models"];
           
            const models = await Promise.all(modelData.map(async (model: ModelFile) => loadModel(model)))
            _models.value.push(...models);
        } catch (err) {
            console.error("Error loading local model data:", err);
        }

    };

    /**
     * Returns desired model from storage with given name.
     *
     * @param name Desired model name.
     *
     * @returns Desired model or default is not exist.
     */
    function find(name: string): Group {
        return toRaw(_models.value).find((model) => model.name === name) ?? getDefault(name);
    }

    return { length, fetchLocal, find };
});
