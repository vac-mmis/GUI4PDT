<template>
    <div class="d-flex h-100 flex-column justify-center">
        <div class="d-flex w-100 justify-center align-center flex-md-wrap">
            <SelectionComponent class="pa-4" @location-status="handleLocationStatus" />
        </div>
        <div class="d-flex h-100 justify-center align-center flex-lg-wrap">
            <div class="w-75 h-100 pa-6">
                <MainPlot :show-location="showLocation" @object-clicked="openObject" />
            </div>
            <div class="w-25 h-100 pa-6" v-if="openedObject">
                <ObjectComponent v-if="openedObject" :object="openedObject" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainPlot from "@/components/PlotlyComponents/MainPlotComponent.vue";
import ObjectComponent from "@/components/PlotlyComponents/ObjectComponent.vue";
import SelectionComponent from "@/components/PlotlyComponents/SelectionComponent.vue";

const openedObject = ref(null);
const showLocation = ref(false);

const openObject = (obj: any) => {
    openedObject.value = obj;
};

const handleLocationStatus = (loc: boolean) => {
    showLocation.value = loc;
};
</script>
