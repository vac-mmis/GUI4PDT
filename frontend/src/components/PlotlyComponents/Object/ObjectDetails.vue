<template>
    <v-card class="h-100" prepend-icon="fa fa-cubes">
        <template v-slot:title> Details on object {{ props.object.id }}</template>
        <v-tabs v-model="tab" color="secondary" align-tabs="center">
            <v-tab :value="1">Type</v-tab>
            <v-tab :value="2">Location</v-tab>
        </v-tabs>
        <div class="h-auto pa-6">
            <template v-if="tab === 1">
                <ObjectPlot :data="object.type" />
            </template>
            <template v-else-if="tab === 2">
                <ObjectPlot :data="object.location" />
            </template>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import ObjectPlot from "@/components/PlotlyComponents/Object/ObjectPlot.vue";
import type { ColorBar, Font, PlotMarker } from "plotly.js-dist-min";
import { onMounted, ref, watch } from "vue";

const props = defineProps(["object"]);
const object = ref({});

const tab = ref(1);

const update = () => {
    let obj = props.object;
    obj.location.visible = true;
    if (obj.location.marker) {
        const marker = obj.location.marker as PlotMarker;
        marker.showscale = true;
        marker.colorbar = {
            y: -0.25,
            orientation: "h",
            yanchor: "bottom",
            title: "Location Density",
            titleside: "bottom",
            titlefont: {
                size: 10,
            } as Font,
            thickness: 20, // Adjust the thickness of the color scale bar
            xpad: 10, // Add padding between the color scale bar and the plot
            ypad: 0, // Set the y padding of the color scale bar to 0
        } as Partial<ColorBar>;
        obj.location.marker = marker;
    }
    object.value = obj;
};

watch(() => props.object, update);

onMounted(update);
</script>
