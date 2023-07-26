<template>
    <v-card
        v-if="opened"
        :title="`Details on object ${object.id}`"
        prepend-icon="fas fa-cubes"
        class="mx-auto"
        elevation="16"
        max-width="500"
    >
        <template v-slot:append>
            <v-btn icon="$close" variant="text" @click="opened = false"> </v-btn>
        </template>

        <v-divider></v-divider>
        <v-card-item>
            <v-tabs v-model="tab" color="secondary" align-tabs="center">
                <v-tab :value="0">Type</v-tab>
                <!-- TODO : Implement location details -->
                <!-- <v-tab :value="1">Location</v-tab> -->
                <v-tab :value="2">Material</v-tab>
            </v-tabs>
            <div class="h-auto pa-6">
                <template v-if="tab === 0">
                    <ObjectPlot :data="[object.class.representation(time)]" />
                </template>
                <template v-if="tab === 2">
                    <ObjectPlot :data="[object.material.representation(time)]" />
                </template>
            </div>
        </v-card-item>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

import ObjectPlot from "@/components/Plot/Object/ObjectPlot.vue";
import type { PDTObject } from "@/models/object.model";

const props = defineProps<{ object: PDTObject; time: number }>();

const opened = ref(true);
const tab = ref<number>(0);

const time = ref<number>(0);
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

watch(
    () => props.time,
    (t: number) => {
        time.value = t;
    }
);
</script>