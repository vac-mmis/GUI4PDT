<template>
    <v-sheet class="d-flex justify-center align-center h-screen w-screen">
        <div class="h-75 w-75" ref="plotContainer" />
    </v-sheet>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Plotly from "plotly.js-dist-min";
import PDT from "@/PDT/PDT";

const plotContainer = ref<HTMLDivElement | null>(null);

const init = async () => {
    const PDT1 = new PDT("./data/PDT1/models/Betonring.obj");
    await PDT1.init();
    const trace: Partial<Plotly.Data>[] = PDT1.models;
    plotContainer.value?.focus();
    if (plotContainer.value === null) {
        console.log("Error: Invalid container");
        return;
    }

    // Set up the layout
    const layout: Partial<Plotly.Layout> = {
        scene: {
            aspectmode: "data",
            aspectratio: { x: 1, y: 1, z: 1 },
        },
    };

    // Create the plot
    Plotly.newPlot(plotContainer.value, trace, layout);
};

onMounted(() => {
    init();
});
</script>
