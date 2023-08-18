<template>
    <div id="container" class="h-100 w-100 bg-secondary self-center" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import worldStore from "@/store/world.store";

const emits = defineEmits<(e: "update", update: number) => void>();

const container = ref<HTMLDivElement | null>(null);
const { setWorld, setStatus } = worldStore();

const selectedCallback = () => {
    emits("update", 1);
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
