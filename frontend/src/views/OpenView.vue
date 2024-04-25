<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div>
        <v-container>
            <v-label>
                <h1 slot="default">Open</h1>
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
                        <v-row>
                            <v-col cols="10">
                                {{ item }}
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-container>
    </div>

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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { PDTStore } from "@/store/pdt.store";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";
import { worldStore } from "@/store/world.store";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";

const pdt = PDTStore();
const models = modelStore();
const materials = materialStore();

const { getStatus } = storeToRefs(worldStore());
const world = worldStore();

const router = useRouter();

const PDTList = ref<string[]>();

const update = ref(0);

const onOpen = async (selected: string) => {
    world.setStatus({ status: "loading PDT", message: "Fetching selected PDT..." });

    world.setStatus({ status: "loading PDT", message: "Fetching selected PDT..." });

    pdt.fetchData(selected)
        .catch((err: string) => {
            world.setStatus({ status: "error", message: err });
            console.error(err);
        })
        .finally(() => {
            world.setStatus({
                status: "loading world",
                message: `${selected} loaded successfully`,
            });
        });

    router.push("/plot");
};

onBeforeMount(async () => {
    world.setStatus({ status: "waiting", message: `Wait for user PDT selection` });
    // Load PDT name list
    pdt.list()
        .then((pdtList: string[]) => {
            PDTList.value = pdtList;
        })
        .catch((err: string) => {
            world.setStatus({ status: "error", message: "No PDT found or server unavailable" });
            console.error(err);
        });

    // Load models and materials
    await models.fetchData();
    await materials.fetchData();
});
</script>
