<template>
    <div class="h-100 w-100" ref="plotContainer" />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { newPlot, react, type PlotData, type Layout } from "plotly.js-dist-min";

const props = defineProps<{ data: Partial<PlotData>[] }>();

const plotContainer = ref<HTMLDivElement | null>(null);

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
        throw new Error("Error: Invalid container");
    }
    newPlot(plotContainer.value, trace, layout, config) as Promise<Plotly.PlotlyHTMLElement>;
};

const update = () => {
    if (plotContainer.value === null) {
        throw new Error("Error: Invalid container");
    }
    react(plotContainer.value, props.data);
};

watch(() => props.data, update);

onMounted(() => {
    init();
});
</script>
