<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import { PDTStore } from "@/store/pdt.store";
import { worldStore } from "@/store/world.store";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";

const models = modelStore();
const materials = materialStore();
const pdt = PDTStore();
const world = worldStore();

const selectedPDT = ref(pdt.getPDT.name ?? "");

const default_pdt = import.meta.env.VITE_DEFAULT_PDT ?? "";

onBeforeMount(async () => {

    if (selectedPDT.value !== "") {
        world.setStatus({ status: "success", message: `` });
        return;
    }
    world.setStatus({ status: "waiting", message: `Wait for PDT` });

    pdt.list()
        .then((pdtList: string[]) => {
            if (pdtList.includes(default_pdt)) {
                selectedPDT.value = default_pdt;
            } else {
                selectedPDT.value = pdtList[0];
            }
        })
        .catch((err: string) => {
            world.setStatus({ status: "error", message: "No PDT found or server unavailable" });
            console.error(err);
        });

    await models.fetchData();
    await materials.fetchData();

    world.setStatus({ status: "loading PDT", message: "Fetching selected PDT..." });
    pdt.fetchData(selectedPDT.value)
        .catch((err: string) => {
            world.setStatus({ status: "error", message: err });
            console.error(err);
        })
        .finally(() => {
            world.setStatus({
                status: "loading world",
                message: `${selectedPDT.value} loaded successfully`,
            });
        });

    
});
</script>
