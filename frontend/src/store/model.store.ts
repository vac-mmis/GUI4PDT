/**
 * Stores and loads available models provided by backend API.
 *
 * @module material.store
 */
import { BoxGeometry, Mesh, MeshStandardMaterial, Group } from "three";
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
const modelStore: any = defineStore("models", () => {
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
     * @returns Desired model or default is not exist.
     */
    function find(name: string): Group {
        return toRaw(_models.value).find((model) => model.name === name) ?? getDefault(name);
    }

    return { length, fetch, find };
});

export default modelStore;
