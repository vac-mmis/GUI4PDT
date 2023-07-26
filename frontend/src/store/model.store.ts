import type { Group } from "three";
import { loadModel } from "@/World/systems/loader";

import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

type ModelFile = {
    name: string;
    content: string;
};

export const modelStore: any = defineStore("models", () => {
    const _models = ref([] as Group[]);

    const length = computed(() => _models.value.length);

    const fetch = async () => {
        await axios
            .get("models")
            .then(
                async (res) =>
                    await Promise.all(res.data.map(async (model: ModelFile) => loadModel(model)))
            )
            .then((models) => _models.value.push(...models));
    };

    function find(name: string): Group | undefined {
        return toRaw(_models.value).find((model) => model.name === name);
    }

    return { length, fetch, find };
});
