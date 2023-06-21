<template>
    <div v-if="!isLoading" class="d-flex flex-row">
        <SelectionComponent @location-status="handleLocationStatus" :objects="objectList" />
        <div class="d-flex h-100 w-100 justify-center">
            <div class="w-75 h-100 pa-6">
                <MainPlot @objects="makeObjectList" @object-clicked="openObject" />
            </div>
            <div class="w-25 h-100 pa-4" v-if="openedObject">
                <ObjectDetails v-if="openedObject" :object="openedObject" />
            </div>
        </div>
    </div>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="secondary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import PDTStore from "@/services/pdt.services";

import MainPlot from "@/components/PlotlyComponents/MainPlotComponent.vue";
import ObjectDetails from "@/components/PlotlyComponents/Object/ObjectDetails.vue";
import SelectionComponent from "@/components/PlotlyComponents/SelectionComponent.vue";

let isLoading = ref(true);
const myPDT = PDTStore();

const openedObject = ref(null);
const showLocation = ref(false);
const objectList = ref(null);
const openObject = (obj: any) => {
    openedObject.value = obj;
};

const handleLocationStatus = (loc: boolean) => {
    showLocation.value = loc;
};

const makeObjectList = (objects: any) => {
    objectList.value = objects;
};

onBeforeMount(async () => {
    isLoading.value = true;
    await myPDT.fetchPDT().finally(() => {
        isLoading.value = false;
    });
});
</script>
