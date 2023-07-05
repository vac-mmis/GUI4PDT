<template>
    <div id="container" class="h-100 w-100 bg-secondary self-center" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { World } from "@/World/world";
import PDTStore from "@/store/pdt.store";
import type { PDTObject } from "@/models/object.model";

const emits = defineEmits<{ (e: "obj", object?: PDTObject | null): void }>();
const container = ref<HTMLDivElement | null>(null);
const pdt = PDTStore();

const selectedCallback = (obj?: PDTObject | null) => {
    emits("obj", obj);
};
onMounted(async () => {
    container.value?.focus();
    if (container.value === null) {
        console.error("Error: Invalid container");
        return;
    }
    const world = new World(container.value, selectedCallback);
    const objects: PDTObject[] = pdt.getObjects();
    world.append(objects);
    world.start();
});
</script>

<style lang="css"></style>
