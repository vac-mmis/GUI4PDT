<template>
    <v-card
        v-if="opened"
        :title="`Details on object ${object.id}`"
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="500"
    >
        <template v-slot:prepend>
            <div class="pa-2">
                <font-awesome-icon :icon="['fas', 'cubes']" />
            </div>
        </template>

        <template v-slot:append>
            <v-btn icon="$close" variant="text" @click="opened = false">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </v-btn>
        </template>

        <v-divider></v-divider>
        <v-card-item>
            <v-tabs v-model="tab" color="secondary" align-tabs="center">
                <v-tab :value="1">Type</v-tab>
                <v-tab :value="2">Location</v-tab>
                <v-tab :value="3">Material</v-tab>
            </v-tabs>
            <div class="h-auto pa-6">
                <template v-if="tab === 1">
                    <ObjectPlot :data="[object.class.representation()]" />
                </template>
                <template v-if="tab === 3">
                    <ObjectPlot :data="[object.material.representation()]" />
                </template>
            </div>
        </v-card-item>
    </v-card>
</template>

<script lang="ts" setup>
import ObjectPlot from "@/components/Plot/Object/ObjectPlot.vue";
import type { PDTObject } from "@/models/object.model";
import { ref, computed, watch } from "vue";

const props = defineProps<{ object: PDTObject }>();

const opened = ref(true);
const object = computed(() => {
    opened.value = true;
    return props.object;
});

watch(
    () => props.object,
    () => {
        opened.value = true;
    }
);

const tab = ref(1);
</script>
