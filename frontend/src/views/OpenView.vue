<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <v-dialog v-model="confirm" width="400">
        <v-card>
            <v-card-title class="text-h5">Are you sure?</v-card-title>
            <v-card-text>Are you sure you want to delete this item?</v-card-text>
            <v-btn @click="confirmDelete" color="error">Yes, delete it!</v-btn>
            <v-btn
                @click="
                    {
                        confirm = false;
                    }
                "
                color=" secondary"
                >No, cancel</v-btn
            >
        </v-card>
    </v-dialog>
    <div>
        <v-container>
            <v-label>
                <template v-slot:default>
                    <h1>Open</h1>
                </template>
            </v-label>

            <v-card max-width="300">
                <v-list dense :key="update">
                    <v-list-item
                        v-for="(item, index) in PDTList"
                        :key="index"
                        :value="item"
                        @click="onOpen(item)"
                        color="primary"
                    >
                        <v-row class="py-1 px-1 d-flex align-center">
                            <v-col cols="9">
                                {{ item }}
                            </v-col>
                            <v-col cols="3" class="d-flex align-center">
                                <v-btn
                                    plain
                                    @click.stop="deleteItem(item)"
                                    icon="fas fa-trash"
                                    style="color: RGB(225, 85, 85)"
                                ></v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-container>
    </div>
    <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>

    <v-overlay
        :model-value="getStatus.status === `loading PDT` || getStatus.status === `loading world`"
        contained
        class="align-center justify-center"
    >
        <div class="d-flex flex-column align-center">
            <span class="text-h5 text-primary pa-4">{{ getStatus.message }}</span>
            <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </div>
    </v-overlay>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { PDTStore } from "@/store/pdt.store";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";
import { worldStore } from "@/store/world.store";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";

const pdt = PDTStore();
const models = modelStore();
const materials = materialStore();

const { getStatus } = storeToRefs(worldStore());
const world = worldStore();

const router = useRouter();

const PDTList = ref<string[]>();

const update = ref(0);

const errorMessage = ref("");

const confirm = ref(false);
const currentForDeletion = ref("");

const onOpen = async (selected: string) => {
    world.setStatus({ status: "loading PDT", message: "Fetching selected PDT..." });

    pdt.fetchData(selected)
        .then(() => {
            world.setStatus({
                status: "loading world",
                message: `${selected} loaded successfully`,
            });
            router.push("/plot");
        })
        .catch((err: string) => {
            world.setStatus({ status: "error", message: err });
            errorMessage.value = err;
            console.error(err);
        });
};

const deleteItem = async (item: string) => {
    currentForDeletion.value = item;
    console.log(item);
    confirm.value = true;
};

const confirmDelete = async () => {
    pdt.list()
        .then((pdts: string[]) => {
            if (pdts.includes(currentForDeletion.value)) {
                confirm.value = false;
                return;
            }
        })
        .then(
            await axios
                .post("/deletePDT", { name: currentForDeletion.value })
                .then(() => {
                    errorMessage.value = "";
                })
                .catch((error) => {
                    console.log(error);
                    errorMessage.value = error.response?.data.message || "An error occured.";
                })
        )
        .catch((err: string) => {
            world.setStatus({ status: "error", message: "No PDT found or server unavailable" });
            console.error(err);
        });
};

watchEffect(() => {
    PDTList.value = pdt.getPDTList;
});

onBeforeMount(async () => {
    world.setStatus({ status: "waiting", message: `Wait for user PDT selection` });
    // Load PDT name list
    pdt.list().catch((err: string) => {
        world.setStatus({ status: "error", message: "No PDT found or server unavailable" });
        console.error(err);
    });

    // Load models and materials
    await models.fetchData();
    await materials.fetchData();
});
</script>
