<template>
    <div ref="plotContainer" />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { newPlot, react, type PlotData, type Layout } from "plotly.js-dist-min";

// Plot data
const props = defineProps<{
    /**
     * Desired data to plot
     */
    data: Partial<PlotData>[];
}>();

// Reference to plot container
const plotContainer = ref<HTMLDivElement | null>(null);

/**
 * Layout definition for Plotly.
 *
 * @see {@link https://plotly.com/javascript/layout-template/ | Layout Template Examples in JavaScript  }
 */
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

/**
 * Configure responsiveness for Plotly.
 *
 * @see {@link https://plotly.com/javascript/responsive-fluid-layout/ | Responsive / Fluid Layouts in JavaScript}
 */
const config = { responsive: true };

/**
 * Use to init plot
 */
const init = () => {
    const trace: Partial<Plotly.Data>[] = props.data ? props.data : [];
    if (plotContainer.value === null) {
        throw new Error("Error: Invalid container");
    }
    newPlot(plotContainer.value, trace, layout, config);
};

/**
 * Update plot data and/or layout
 */
const update = () => {
    if (plotContainer.value === null) {
        throw new Error("Error: Invalid container");
    }
    react(plotContainer.value, props.data, layout);
};

watch(() => props.data, update);

onMounted(init);
</script>
