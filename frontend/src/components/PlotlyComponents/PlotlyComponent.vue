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

const getPDT = async () => {};
const init = async () => {
    //const PDT1 = new PDT("./data/PDT1/models/Betonring.obj");
    //await PDT1.init();
    axios
        .get("http://localhost:3000/api")
        .then((res) => {
            myPDT = res.data;
        })
        .then(() => {
            const trace: Partial<Plotly.Data>[] = myPDT.objects;

            plotContainer.value?.focus();
            if (plotContainer.value === null) {
                console.log("Error: Invalid container");
                return;
            }

            // Set up the layout
            const layout: Partial<Plotly.Layout> = {
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 0,
                },
                scene: {
                    aspectmode: "data",
                    aspectratio: { x: 1, y: 1, z: 1 },
                    xaxis: { title: "X Axis" },
                    yaxis: { title: "Y Axis" },
                    zaxis: { title: "Z Axis" },
                },
                showlegend: true, // Show a single legend
            };

            // Create the plot
            Plotly.newPlot(plotContainer.value, trace, layout);
        })
        .catch((err) => console.log(err));
};

onMounted(() => {
    init();
});
</script>
