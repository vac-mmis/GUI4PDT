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
                <v-btn color="primary" variant="text" @click="onPDTSelection"> Ok </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-overlay
        :model-value="status.status === `loading`"
        contained
        class="align-center justify-center"
    >
        <div class="d-flex flex-column align-center">
            <span class="text-h5 text-primary pa-4">{{ status.message }}</span>
            <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </div>
    </v-overlay>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import PDTStore from "@/store/pdt.store";
import modelStore from "@/store/model.store";
import materialStore from "@/store/material.store";

import type { Status } from "@/types/log.types";

const models = modelStore();
const materials = materialStore();
const pdt = PDTStore();

const emits = defineEmits<{ (e: "status", status: Status): void }>();

const status = ref<Status>({ status: "loading", message: "" });
const dialog = ref(false);

const PDTList = ref<string[]>();
const selectedPDT = ref("");

const onPDTSelection = async () => {
    status.value.status = "loading";
    status.value.message = "Fetching selected PDT...";
    dialog.value = false;
    pdt.fetch(selectedPDT.value)
        .catch((err: string) => {
            status.value = { status: "error", message: err };
            emits("status", status.value);
            console.error(err);
        })
        .finally(() => {
            status.value = { status: "success", message: `${selectedPDT} loaded successfully` };
            emits("status", status.value);
        });
};

onBeforeMount(async () => {
    status.value = { status: "waiting", message: `Wait for user PDT selection` };
    pdt.list()
        .then((pdtList: string[]) => {
            PDTList.value = pdtList;
            dialog.value = true;
        })
        .catch((err: string) => {
            status.value = { status: "error", message: "No PDT found or server unavailable" };
            console.error(err);
            emits("status", status.value);
        });
    await models.fetch();
    await materials.fetch();
});
</script>
