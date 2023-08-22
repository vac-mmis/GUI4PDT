<template>
    <v-dialog v-model="dialog" scrollable contained persistent width="auto">
        <v-card>
            <v-card-title>Select available PDT</v-card-title>

            <v-card-text>
                <v-autocomplete
                    v-model="selectedPDT"
                    label="PDT"
                    :items="PDTList"
                    variant="outlined"
                />
            </v-card-text>

            <v-card-actions class="d-flex flex-row justify-space-between">
                <v-btn color="red" variant="text" @click="onCancel" :disabled="!pdt.getPDT.name">
                    Cancel</v-btn
                >
                <v-btn
                    color="primary"
                    variant="text"
                    @click="onSelect"
                    :disabled="selectedPDT === ``"
                >
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

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

const dialog = ref(false);

const PDTList = ref<string[]>();
const selectedPDT = ref(pdt.getPDT.name ?? "");

const onSelect = async () => {
    world.setStatus({ status: "loading PDT", message: "Fetching selected PDT..." });
    dialog.value = false;
    pdt.fetch(selectedPDT.value)
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
};

const onCancel = () =>
    world.setStatus({
        status: "success",
        message: `Selection cancelled`,
    });

onBeforeMount(async () => {
    world.setStatus({ status: "waiting", message: `Wait for user PDT selection` });
    pdt.list()
        .then((pdtList: string[]) => {
            PDTList.value = pdtList;
            dialog.value = true;
        })
        .catch((err: string) => {
            world.setStatus({ status: "error", message: "No PDT found or server unavailable" });
            console.error(err);
        });
    await models.fetch();
    await materials.fetch();
});
</script>
