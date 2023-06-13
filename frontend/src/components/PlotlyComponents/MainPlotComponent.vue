<template>
    <v-sheet class="d-flexjustify-center align-center">
        <div class="h-100 w-100" ref="plotContainer" />
    </v-sheet>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Plotly from "plotly.js-dist-min";
import type { PDT } from "./pdt.types";

const emits = defineEmits(["object-clicked"]);

const plotContainer = ref<HTMLDivElement | null>(null);

let myPDT = {} as PDT;

const plot3D = async () => {
    let trace: Partial<Plotly.Data>[] = myPDT.objects.map((obj) => {
        return obj.location;
    });
    plotContainer.value?.focus();
    if (plotContainer.value === null) {
        console.error("Error: Invalid container");
        return;
    }

    // Set up the layout
    const layout: Partial<Plotly.Layout> = {
        scene: {
            aspectmode: "data",
            aspectratio: { x: 1, y: 1, z: 1 },
            xaxis: { title: "X Axis" },
            yaxis: { title: "Y Axis" },
            zaxis: { title: "Z Axis" },
        },
    };

    const config = { responsive: true };
    // Create the plot
    const plot = Plotly.newPlot(plotContainer.value, trace, layout, config);
    (await plot).on("plotly_click", (eventData: Plotly.PlotSelectionEvent) => {
        const pointIndex = eventData.points[0].curveNumber;
        const clickedObject = myPDT.objects[pointIndex];
        emits("object-clicked", clickedObject);
    });
};

const init = async () => {
    axios
        .get("http://localhost:3000/api")
        .then((res) => {
            myPDT = res.data;
            myPDT.models.forEach((model: any) => {
                model.i = Object.values(model.i);
                model.j = Object.values(model.j);
                model.k = Object.values(model.k);
            });
        })
        .then(() => plot3D())
        .catch((err) => console.error(err));
};

onMounted(() => {
    init();
});
</script>
