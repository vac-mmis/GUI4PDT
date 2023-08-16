<template>
    <div id="container" class="h-100 w-100 bg-secondary self-center" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Object3D } from "three";

import type { PDTObject } from "@/models/object.model";
import type { Timer } from "@/World/systems/Timer";

import worldStore from "@/store/world.store";

const emits = defineEmits<{
    (e: "obj", object?: PDTObject | null): void;
    (e: "timer", timer: Timer): void;
}>();

const container = ref<HTMLDivElement | null>(null);
const { setWorld, setStatus } = worldStore();

const selectedCallback = (obj?: Object3D | null) => {
    if (obj) {
        emits("obj", obj as PDTObject);
    }
};

onMounted(async () => {
    container.value?.focus();
    if (container.value === null) {
        throw new Error("Error: Invalid container");
    }
    setWorld(container.value, selectedCallback);
    setStatus({ status: "success", message: "Scene loaded successfully" });
});
</script>
