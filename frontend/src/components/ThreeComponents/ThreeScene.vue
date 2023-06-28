<template>
    <div id="container" class="absolute w-full h-screen bg-secondary" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { World } from "@/World/world";
// Get a reference to the container element that will hold our scene

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
    container.value?.focus();
    if (container.value === null) {
        console.error("Error: Invalid container");
        return;
    }

    const world = new World(container.value);
    world.init().then(() => {
        world.start();
    });
});
</script>

<style lang="css"></style>
