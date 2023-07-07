<template>
    <div
        v-if="!isLoading"
        class="d-flex flex-column justify-space-between align-center h-100 w-100"
    >
        <div class="position-absolute h-100 w-100 d-flex justify-center align-center z-0">
            <ThreeScene @obj="onSelectedObject" @timer="getTimer" />
        </div>
        <div class="w-100 d-flex flex-row justify-space-between">
            <SelectionComponent class="position-relative overflow-visible z-1" />

            <div v-if="selectedObject" class="position-relative w-25 h-auto pa-6 z-1">
                <ObjectDetails :object="selectedObject" />
            </div>
        </div>
        <div class="position-relative w-75 ma-6 z-1">
            <TimeSlider :timer="timer"></TimeSlider>
        </div>
    </div>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="secondary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import ObjectDetails from "@/components/Plot/Object/ObjectDetails.vue";
import SelectionComponent from "@/components/Plot/SelectionComponent.vue";
import TimeSlider from "@/components/Plot/TimeSlider.vue";
import ThreeScene from "@/components/Plot/ThreeScene.vue";
import PDTStore from "@/store/pdt.store";
import type { PDTObject } from "@/models/object.model";
import type { Timer } from "@/World/systems/Timer";

const isLoading = ref(true);

const timer = ref<Timer>();
const getTimer = (t: Timer) => {
    timer.value = t;
};

const selectedObject = ref<PDTObject | null | undefined>(null);
const onSelectedObject = (obj?: PDTObject | null) => {
    selectedObject.value = obj;
};

const pdt = PDTStore();

onBeforeMount(async () => {
    isLoading.value = true;
    await pdt.fetchPDT().finally(() => {
        isLoading.value = false;
    });
});
</script>
