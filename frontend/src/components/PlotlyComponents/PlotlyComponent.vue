<template>
    <v-sheet class="d-flex justify-center align-center h-screen w-screen">
        <div class="h-75 w-75" ref="plotContainer" />
    </v-sheet>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Plotly from "plotly.js-dist-min";
import PDT from "@/PDT/PDT";

const plotContainer = ref<HTMLDivElement | null>(null);
let myPDT = {} as PDT;

const init = async () => {
    const PDT1 = new PDT("./data/PDT1/models/Betonring.obj");
    await PDT1.init();

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
        .then(() => {
            let trace: Partial<Plotly.Data>[] = myPDT.objects;
            trace = trace.concat(myPDT.models);
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
            // Create the plot
            Plotly.newPlot(plotContainer.value, trace, layout);
        })
        .catch((err) => console.error(err));
};

onMounted(() => {
    init();
});
</script>
