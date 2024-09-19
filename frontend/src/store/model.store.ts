/**
 * Stores and loads available models provided by backend API.
 *
 * @module Store.Models
 */
import { BoxGeometry, Mesh, MeshStandardMaterial, Group } from "three";
import { loadModel } from "@/World/systems/loader";

import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore, type StoreDefinition } from "pinia";

import type { ModelFile } from "@/interfaces/assets";

const staticMode = import.meta.env.VITE_STATIC_MODE === "true";

/**
 * Model store handle by Pinia.
 */
export const modelStore: StoreDefinition = defineStore("models", () => {
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

    function getModels(): Group[] {
        return toRaw(_models.value);
    }

    /**
     * Fetch, load and store models from backend API.
     */
    const fetchRemotely = async () => {
        await axios
            .get("models")
            .then(
                async (res) =>
                    await Promise.all(res.data.map(async (model: ModelFile) => loadModel(model)))
            )
            .then((models) => {
                _models.value = [];
                _models.value.push(...models);
            });
    };

    /**
     * Fetch, load and store models from backend API.
     */
    const fetchLocally = async () => {
        try {
            const response = await fetch("backend_data.json");
            const data = await response.json();
            const modelData = data["models"];

            const models = await Promise.all(
                modelData.map(async (model: ModelFile) => loadModel(model))
            );
            _models.value.push(...models);
        } catch (err) {
            console.error("Error loading local model data:", err);
        }
    };

    async function fetchData() {
        if (staticMode) {
            return fetchLocally();
        } else {
            return fetchRemotely();
        }
    }

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

    const initWebSocket = () => {
        const ws = new WebSocket("ws://localhost:3030");

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);

            if (data.object === "model") {
                await fetchData();

                const message = {
                    object: "pdt",
                    event: null,
                    name: null,
                    isDirectory: null,
                };
                ws.send(JSON.stringify(message));
            }
        };
    };
    if (import.meta.env.VITE_STATIC_MODE === "false") {
        initWebSocket();
    }

    return { length, fetchData, find, getModels };
});
