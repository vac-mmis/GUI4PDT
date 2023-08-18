<template>
    <div ref="plotContainer" />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { newPlot, react, type PlotData, type Layout } from "plotly.js-dist-min";

const props = defineProps<{ data: Partial<PlotData>[] }>();

const plotContainer = ref<HTMLDivElement | null>(null);

const layout = {
    font: { size: 14 },
    margin: { t: 15, b: 0, l: 5, r: 5 },
    height: 400,
    width: 400,
    scene: {
        aspectmode: "data",
        aspectratio: { x: 1, y: 1, z: 1 },
    },
    colorway: ["#004a99", "#7d48a3", "#c44094", "#f54872", "#ff6e46", "#ffa100"],
} as Partial<Layout>;

const config = { responsive: true };

const init = () => {
    const trace: Partial<Plotly.Data>[] = props.data ? props.data : [];
    if (plotContainer.value === null) {
        throw new Error("Error: Invalid container");
    }
    newPlot(plotContainer.value, trace, layout, config);
};

const update = () => {
    if (plotContainer.value === null) {
        throw new Error("Error: Invalid container");
    }
    react(plotContainer.value, props.data, layout);
};

watch(() => props.data, update);

onMounted(() => {
    init();
});
</script>
