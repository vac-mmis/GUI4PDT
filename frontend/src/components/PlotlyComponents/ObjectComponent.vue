<template>
    <v-card class="h-100" prepend-icon="fa fa-cubes">
        <template v-slot:title> Details on object {{ props.object.id }}</template>
        <v-tabs v-model="tab" color="secondary" align-tabs="center">
            <v-tab :value="1">Type</v-tab>
            <v-tab :value="2">Location</v-tab>
        </v-tabs>
        <div class="h-auto pa-6">
            <template v-if="tab === 1">
                <ObjectPlot :data="object.type" />
            </template>
            <template v-else-if="tab === 2">
                <ObjectPlot :data="object.location" />
            </template>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import ObjectPlot from "@/components/PlotlyComponents/ObjectPlot.vue";
import { onMounted } from "vue";
import { watch } from "vue";
import { ref } from "vue";

const props = defineProps(["object"]);
const object = ref({});

const tab = ref(1);

const update = () => {
    object.value = props.object;
};

watch(() => props.object, update);

onMounted(update);
</script>
