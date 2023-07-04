<template>
    <div v-if="!isLoading" class="h-100 w-100">
        <div class="position-absolute h-100 w-100 d-flex justify-center align-center z-0">
            <ThreeScene />
        </div>
        <div class="w-100 d-flex flex-row justify-space-between">
            <SelectionComponent class="position-relative overflow-visible z-1" />

            <div class="position-relative w-25 h-auto pa-6 z-1">
                <ObjectDetails :object="objects[0]" />
            </div>
        </div>
    </div>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="secondary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import ObjectDetails from "@/components/Plot/Object/ObjectDetails.vue";
import SelectionComponent from "@/components/Plot/SelectionComponent.vue";
import ThreeScene from "@/components/Plot/ThreeScene.vue";
import PDTStore from "@/store/pdt.store";

const isLoading = ref(true);

const pdt = PDTStore();
const objects = computed(() => pdt.getObjects());

onBeforeMount(async () => {
    isLoading.value = true;
    await pdt.fetchPDT().finally(() => {
        isLoading.value = false;
    });
});
</script>
