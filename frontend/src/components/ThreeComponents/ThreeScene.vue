<template>
    <div id="container" class="absolute w-full h-screen bg-secondary" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { World } from "@/World/world";
import PDTStore from "@/store/pdt.store";
import type { PDTObject } from "@/models/object.model";

// Get a reference to the container element that will hold our scene

const container = ref<HTMLDivElement | null>(null);
const pdt = PDTStore();

onMounted(async () => {
    await pdt.fetchPDT().then(() => {
        container.value?.focus();
        if (container.value === null) {
            console.error("Error: Invalid container");
            return;
        }
        const world = new World(container.value);
        const objects: PDTObject[] = pdt.getObjects();
        world.append(objects);
        world.start();
    });
});
</script>

<style lang="css"></style>
