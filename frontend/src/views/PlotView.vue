<template>
    <div
        v-if="status.status === `success`"
        class="d-flex flex-column justify-space-between align-center h-100 w-100"
    >
        <div class="position-absolute h-100 w-100 d-flex justify-center align-center z-0">
            <ThreeScene @obj="onSelectedObject" @timer="getTimer" />
        </div>
        <div class="w-100 d-flex flex-row justify-space-between">
            <SelectionComponent
                @obj="onSelectedObject"
                class="position-relative overflow-visible z-1"
            />

            <div v-if="selectedObject" class="position-relative w-25 h-auto pa-6 z-1">
                <ObjectDetails :object="selectedObject" :time="selectedTime" />
            </div>
        </div>
        <div v-if="timeLength > 1" class="position-relative w-75 ma-6 z-1">
            <TimeSlider :timer="timer" @time="updateTime"></TimeSlider>
        </div>
    </div>
    <div v-if="status.status === `waiting`" class="d-flex position-relative h-100 w-auto">
        <PDTLoader @status="getStatus" />
    </div>
    <div v-if="status.status === `error`" class="d-flex align-center h-auto w-100 pa-10">
        <v-alert class="h-auto w-50" closable type="error" title="Error">
            {{ status.message }}
        </v-alert>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import PDTLoader from "@/components/Plot/Controls/PDTLoader.vue";
import ObjectDetails from "@/components/Plot/Object/ObjectDetails.vue";
import SelectionComponent from "@/components/Plot/Controls/SelectionComponent.vue";
import TimeSlider from "@/components/Plot/Controls/TimeSlider.vue";
import ThreeScene from "@/components/Plot/ThreeScene.vue";

import PDTStore from "@/store/pdt.store";
import type { PDTObject } from "@/models/object.model";
import type { Timer } from "@/World/systems/Timer";
import type { Status } from "@/components/Utils/status";

const { timeLength } = storeToRefs(PDTStore());

const status = ref<Status>({ status: "waiting", message: "" });

const timer = ref<Timer>();
const selectedTime = ref<number>(0);
const getTimer = (t: Timer) => {
    timer.value = t;
};
const updateTime = (t: number) => {
    selectedTime.value = t;
};

const selectedObject = ref<PDTObject | null>();
const onSelectedObject = (obj?: PDTObject | null) => {
    selectedObject.value = obj;
};

const getStatus = (s: Status) => {
    status.value = s;
};
</script>
