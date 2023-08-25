<template>
    <v-window v-model="tabs">
        <v-window-item value="description">
            <v-card-text>
                <MarkdownText :content="details.description ?? ``" />
            </v-card-text>
        </v-window-item>
        <v-window-item value="plot">
            <PlotComponent v-if="details.representation" :data="[details.representation]" />
        </v-window-item>
    </v-window>
    <v-tabs v-model="tabs" color="primary" grow>
        <v-tab value="description">
            <v-icon>fas fa-list</v-icon>
        </v-tab>
        <v-tab value="plot" :disabled="!details.representation">
            <v-icon>fas fa-pie-chart</v-icon>
        </v-tab>
    </v-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import MarkdownText from "@/components/Generics/MarkdownText.vue";
import PlotComponent from "@/components/Generics/PlotComponent.vue";

import type { ObjectDetails } from "@/models/Controls";

// Tabs
const tabs = ref<string>("description");

// Details
const props = defineProps<{ details: ObjectDetails }>();
const details = computed(() => props.details);
</script>
