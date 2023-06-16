<template>
    <div class="d-flex h-100 justify-center align-center">
        <div class="h-100 w-100" ref="plotContainer" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";
import { type PlotlyHTMLElement, type PlotMarker, newPlot, react } from "plotly.js-dist-min";
import type { PDT } from "./pdt.types";

const emits = defineEmits(["object-clicked"]);
const props = defineProps({
    showLocation: {
        type: Boolean,
        required: true,
        default: false,
    },
});
let showLocation = props.showLocation;

let myPDT = {} as PDT;

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
    const clickedObject = myPDT.objects.find((obj) => obj.id === objectID);
    if (clickedObject !== undefined) {
        emits("object-clicked", clickedObject);
    }
};

const plot3D = async () => {
    const plotData: Partial<Plotly.Data>[] = myPDT.objects
        .map((obj) => {
            const location = obj.location;
            location.visible = showLocation;
            const objects = obj.obj.map((model: any) => {
                model.i = Object.values(model.i);
                model.j = Object.values(model.j);
                model.k = Object.values(model.k);
                return model;
            });
            return [location, ...objects];
        })
        .flat();

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

watchEffect(async () => {
    showLocation = props.showLocation;
    if (plot !== null) {
        const plotData = await plot;
        const updatedData = myPDT.objects
            .map((obj) => {
                let location = obj.location;
                location.visible = showLocation;
                if (location.marker) {
                    let marker = location.marker as PlotMarker;
                    marker.colorbar = {};
                    marker.showscale = false;
                    location.marker = marker;
                }
                return [location, ...obj.obj];
            })
            .flat();
        plot = react(plotData, updatedData, layout);
    }
});

onMounted(() => {
    init();
});
</script>
