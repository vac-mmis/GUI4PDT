<template>
    <v-card class="h-100" prepend-icon="fa fa-cubes">
        <template v-slot:title> Details on object {{ props.object.id }}</template>
        <v-card-text class="d-flex h-100 justify-center">
            <div class="h-100 w-100" ref="plotContainer" />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { newPlot } from "plotly.js-dist-min";
import type { Data } from "plotly.js-dist-min";

const plotContainer = ref<HTMLDivElement | null>(null);
let chart: Promise<Plotly.PlotlyHTMLElement> | null = null;

const updatePlot = () => {
    const trace: Partial<Data>[] = props.object ? [props.object.type] : [];

    if (plotContainer.value === null) {
        console.error("Error: Invalid container");
        return;
    }

    const layout = {
        title: "Type categories",
        font: { size: 14 },
    };

    const config = { responsive: true };

    if (props.object === undefined) {
    } else {
        chart = newPlot(
            plotContainer.value,
            trace,
            layout,
            config
        ) as Promise<Plotly.PlotlyHTMLElement>;
        chart.catch((error) => console.error("Error creating plot:", error));
    }
};

const props = defineProps(["object"]);

watch(
    () => props.object,
    () => {
        updatePlot();
    }
);

onMounted(() => {
    updatePlot();
});
</script>
