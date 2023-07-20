<template>
    <div id="container" class="h-100 w-100 bg-secondary self-center" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { World } from "@/World/world";
import type { Timer } from "@/World/systems/Timer";

import PDTStore from "@/store/pdt.store";
import type { PDTObject } from "@/models/object.model";

const emits = defineEmits<{
    (e: "obj", object?: PDTObject | null): void;
    (e: "timer", timer: Timer): void;
}>();

const container = ref<HTMLDivElement | null>(null);
const pdt = PDTStore();

const selectedCallback = (obj?: PDTObject | null) => {
    emits("obj", obj);
};

onMounted(async () => {
    container.value?.focus();
    if (container.value === null) {
        throw new Error("Error: Invalid container");
    }
    const world = new World(container.value, selectedCallback);
    emits("timer", world.getTimer());
    world.append(pdt.getObjects());
});
</script>
