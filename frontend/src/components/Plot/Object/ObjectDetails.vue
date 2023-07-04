<template>
    <v-card>
        <template v-slot:title>
            <div class="d-flex justify-between align-center pa-2">
                <font-awesome-icon :icon="['fas', 'cubes']" />
                <span class="px-6">Details on object {{ props.object.id }}</span>
            </div>
        </template>
        <v-tabs v-model="tab" color="secondary" align-tabs="center">
            <v-tab :value="1">Type</v-tab>
            <v-tab :value="2">Location</v-tab>
        </v-tabs>
        <div class="h-auto pa-6">
            <template v-if="tab === 1">
                <ObjectPlot :data="[object.class]" />
            </template>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import ObjectPlot from "@/components/Plot/Object/ObjectPlot.vue";
import type { PDTObject } from "@/models/object.model";
import { ref, computed } from "vue";

const props = defineProps<{ object: PDTObject }>();
const object = computed(() => {
    return props.object;
});

const tab = ref(1);
</script>
