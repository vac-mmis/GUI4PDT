<template>
    <v-sheet class="d-flex justify-center align-center h-screen w-screen">
        <div class="h-75 w-75" ref="plotContainer" />
    </v-sheet>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Plotly from 'plotly.js-dist-min';

const plotContainer = ref<HTMLDivElement | null>(null);

const reefData: Partial<Plotly.Data> = {
    type: 'surface',
    z: [
        [10, 10, 10, 10, 10],
        [10, 20, 30, 20, 10],
        [10, 30, 40, 30, 10],
        [10, 20, 30, 20, 10],
        [10, 10, 10, 10, 10]
    ],
    colorscale: 'Blues',
    opacity: 0.5,
};

const boatData: Partial<Plotly.Data> = {
    x: [2.5], y: [2.5], z: [40],
    name: "boat",
    mode: 'markers',
    marker: {
        size: 12,
        symbol: "diamond-open",
        line: {
            color: 'rgba(217, 217, 217, 0.14)',
            width: 0.5
        },
        opacity: 0.8
    },
    type: 'scatter3d'
};

const layout: Partial<Plotly.Layout> = {
    scene: {
        aspectratio: {
            x: 1,
            y: 1,
            z: 0.4
        },
        camera: {
            eye: {
                x: -1.5,
                y: -1.5,
                z: 1
            }
        },
    }
};

const data: Plotly.Data[] = [reefData, boatData];

const init = () => {
    plotContainer.value?.focus();
    if (plotContainer.value === null) {
        return;
    }

    Plotly.newPlot(plotContainer.value, data, layout, { responsive: true });
}

onMounted(() => {
    init();
});

</script>