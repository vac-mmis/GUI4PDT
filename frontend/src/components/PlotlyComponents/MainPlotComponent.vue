<template>
    <div class="d-flex h-100 justify-center align-center">
        <div class="h-100 w-100" ref="plotContainer" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { type PlotlyHTMLElement, newPlot, react, update } from "plotly.js-dist-min";
import PDTStore from "@/services/pdt.services";
import ObjectServices from "@/services/object.services";

const myPDTStore = PDTStore();

const emits = defineEmits(["object-clicked"]);

const plotContainer = ref<HTMLDivElement | null>(null);
let plot: Promise<PlotlyHTMLElement> | null = null;
const config = { responsive: true };
const layout: Partial<Plotly.Layout> = {
    margin: {
        l: 2,
        r: 2,
        b: 2,
        t: 24,
    },
    scene: {
        aspectmode: "data",
        aspectratio: { x: 1, y: 1, z: 1 },
        xaxis: { title: "X Axis" },
        yaxis: { title: "Y Axis" },
        zaxis: { title: "Z Axis" },
    },
    showlegend: false,
};

const sendObject = (eventData: Plotly.PlotSelectionEvent) => {
    const objectID = eventData.points[0].data.customdata[0];
    const clickedObject = myPDTStore.findObject(objectID as number);
    if (clickedObject !== undefined) {
        emits("object-clicked", clickedObject);
    }
};

const plot3D = async () => {
    const plotData: Partial<Plotly.Data>[] = myPDTStore.getPlot();

    plotContainer.value?.focus();
    if (plotContainer.value === null) {
        console.error("Error: Invalid container");
        return;
    }

    // Create the plot
    plot = newPlot(plotContainer.value, plotData, layout, config) as Promise<PlotlyHTMLElement>;
    plot.catch((error) => console.error("Error creating plot:", error));
    (await plot).on("plotly_click", sendObject);
};

watch(
    () => myPDTStore.showLocation.value,
    async (newShowLocation) => {
        console.log(newShowLocation);
        //myPDTStore.updatePDT(ObjectServices.toggleLocation(newShowLocation));
        if (plot !== null) {
            const plotData = await plot;
            const updatedData = myPDTStore.getPlot();
            plot = react(plotData, updatedData, layout);
        }
    }
);

onMounted(() => {
    plot3D();
});
</script>
