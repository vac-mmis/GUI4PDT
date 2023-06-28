<template>
    <div class="h-100 w-100" ref="plotContainer" />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { newPlot, type PlotData, type Layout } from "plotly.js-dist-min";
import type { Type } from "@/models/type.model";
import type { Location } from "@/models/location.model";

const props = defineProps<{ data: Partial<PlotData>[] }>();

const plotContainer = ref<HTMLDivElement | null>(null);
let chart: Promise<Plotly.PlotlyHTMLElement> | null = null;
const layout = {
    font: { size: 14 },
    margin: {
        l: 12,
        r: 12,
        b: 12,
        t: 24,
    },
    scene: {
        aspectmode: "data",
        aspectratio: { x: 1, y: 1, z: 1 },
        xaxis: { title: "X Axis" },
        yaxis: { title: "Y Axis" },
        zaxis: { title: "Z Axis" },
    },
} as Partial<Layout>;

const config = { responsive: true };

const init = () => {
    const trace: Partial<Plotly.Data>[] = props.data ? props.data : [];

    if (plotContainer.value === null) {
        console.error("Error: Invalid container");
        return;
    }

    if (props.data === undefined) {
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

watch(() => props.data, init);

onMounted(() => {
    init();
});
</script>
