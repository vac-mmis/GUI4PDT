<template>
    <div class="d-flex h-100 justify-center align-center flex-md-wrap">
        <MainPlot class="h-100 w-75 pa-6" @object-clicked="openObject" />
        <ObjectComponent class="h-100 w-25" v-if="openedObject" :object="openedObject" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainPlot from "@/components/PlotlyComponents/MainPlotComponent.vue";
import ObjectComponent from "@/components/PlotlyComponents/ObjectComponent.vue";

const openedObject = ref(null);

const openObject = (obj: any) => {
    openedObject.value = obj;
};
</script>
