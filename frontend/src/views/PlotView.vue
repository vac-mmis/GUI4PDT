<template>
    <!-- Three Scene -->
    <div
        v-if="getStatus.status === `loading world` || getStatus.status === `success`"
        class="position-absolute h-100 w-100 d-flex justify-center align-center z-0"
    >
        <ThreeScene @update="updateDetails" />
    </div>

    <!-- Scene controllers (menu, slider) -->
    <div
        v-if="getStatus.status === `success`"
        class="d-flex flex-column justify-space-between align-center h-100 w-100"
    >
        <div class="w-100 d-flex flex-row justify-space-between">
            <SceneMenu @update="updateDetails" class="position-relative overflow-visible z-1" />

            <div class="position-relative pa-6 z-1">
                <ObjectDetails :key="detailsKey" :time="selectedTime" />
            </div>
        </div>
        <div v-if="timeLength > 1" class="position-relative w-75 ma-6 z-1">
            <TimeSlider @time="(t: number) => (selectedTime = t)" />
        </div>
    </div>

    <!-- PDT loader, used to switch PDT -->
    <div v-if="getStatus.status === `waiting`" class="d-flex position-relative h-100 w-auto">
        <PDTLoader />
    </div>

    <!-- Loading overlay -->
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

    <!-- See errors -->
    <div v-if="getStatus.status === `error`" class="d-flex align-center h-auto w-100 pa-10">
        <v-alert class="h-auto w-50" closable type="error" title="Error">
            {{ getStatus.message }}
        </v-alert>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import PDTLoader from "@/components/Plot/Controls/PDTLoader.vue";
import ObjectDetails from "@/components/Plot/Object/ObjectDetails.vue";
import SceneMenu from "@/components/Plot/Scene/SceneMenu.vue";
import TimeSlider from "@/components/Plot/Scene/TimeSlider.vue";
import ThreeScene from "@/components/Plot/Scene/ThreeScene.vue";

import { PDTStore } from "@/store/pdt.store";
import { worldStore } from "@/store/world.store";

const { timeLength } = storeToRefs(PDTStore());
const { getStatus } = storeToRefs(worldStore());

const selectedTime = ref<number>(0);
const detailsKey = ref(0);

const updateDetails = () => {
    detailsKey.value += 1;
    detailsKey.value %= 2;
};
</script>
