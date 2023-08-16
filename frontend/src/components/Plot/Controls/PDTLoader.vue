<template>
    <v-dialog v-model="dialog" scrollable contained persistent width="auto">
        <v-card>
            <v-card-title>Select available PDT</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-radio-group v-model="selectedPDT" column>
                    <v-radio
                        v-for="pdtName in PDTList"
                        :key="pdtName"
                        :label="pdtName"
                        :value="pdtName"
                    ></v-radio>
                </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn
                    color="primary"
                    variant="text"
                    @click="onPDTSelection"
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

import PDTStore from "@/store/pdt.store";
import worldStore from "@/store/world.store";
import modelStore from "@/store/model.store";
import materialStore from "@/store/material.store";

const models = modelStore();
const materials = materialStore();
const pdt = PDTStore();
const world = worldStore();

const dialog = ref(false);

const PDTList = ref<string[]>();
const selectedPDT = ref("");

const onPDTSelection = async () => {
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
