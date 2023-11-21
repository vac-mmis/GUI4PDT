<template>
    <div id="container" class="h-100 w-100 bg-secondary self-center" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { worldStore } from "@/store/world.store";
import { PDTStore } from "@/store/pdt.store";


const emits = defineEmits<
    /**
     * Emits a number as signal to update some other components in `PlotView`.
     */
    (e: "update", update: number) => void
>();

const container = ref<HTMLDivElement | null>(null);
const { setWorld, setStatus } = worldStore();

/**
 * Function called by the world `Pointer` to trigger other components for a selected object update.
 */
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
