<template>
    <div :class="openList ? `w-auto` : ``">
        <v-toolbar class="w-100" :collapse="!openList" title="Objects">
            <v-app-bar-nav-icon @click="toggleList"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-sheet class="border w-full h-full" v-if="openList">
            <v-switch
                @change="toggleGlobalLocation"
                v-model="globalLoc"
                hide-details
                inset
                label="Location Density"
                class="px-6"
            >
            </v-switch>
            <div class="w-100">
                <v-card
                    v-for="(object, index) in objects"
                    :key="object.id"
                    :object="object"
                    class="d-flex w-100 pa-2 justify-space-between align-center mx-auto"
                >
                    <v-card-title class="text-h6">Object {{ object.name }}</v-card-title>
                    <v-card-actions>
                        <v-btn-toggle
                            v-model="toggleObjects[index]"
                            multiple
                            rounded="xl"
                            color="secondary"
                        >
                            <v-btn
                                value="display"
                                @click="
                                    object.toggleVisibility(
                                        toggleObjects[index].includes(`display`)
                                    )
                                "
                            >
                                <v-icon icon="far fa-eye" />
                                <v-tooltip activator="parent" location="bottom">
                                    Show object
                                </v-tooltip>
                            </v-btn>
                            <v-btn
                                value="loc"
                                @click="object.toggleLocation(toggleObjects[index].includes(`loc`))"
                            >
                                <v-icon icon="fas fa-crosshairs" />
                                <v-tooltip activator="parent" location="bottom">
                                    Show location
                                </v-tooltip>
                            </v-btn>
                        </v-btn-toggle>
                    </v-card-actions>
                </v-card>
            </div>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, type ComputedRef } from "vue";

import { PDTObjServices, type PDTObject } from "@/models/object.model";
import PDTStore from "@/store/pdt.store";

const pdt = PDTStore();
const objects: ComputedRef<PDTObject[]> = computed(() => pdt.getObjects());

const openList = ref(false);
const toggleList = () => {
    openList.value = !openList.value;
};

const toggleObjects = ref([[]] as string[][]);

const globalLoc = ref(false);
const toggleGlobalLocation = () => {
    pdt.updateObjects(PDTObjServices.toggleLocation(globalLoc.value));
    toggleObjects.value.forEach((objToggle) => {
        const index = objToggle.indexOf("loc");
        if (globalLoc.value && index < 0) {
            objToggle.push("loc");
        }
        if (!globalLoc.value && index > -1) {
            objToggle.splice(index);
        }
    });
};

onMounted(() => {
    toggleObjects.value.length = objects.value.length;
    toggleObjects.value.fill(["display"], 0, objects.value.length);
});

watch(
    () => toggleObjects,
    () => {
        if (toggleObjects.value.every((objToggle: any) => objToggle.includes(`loc`))) {
            globalLoc.value = true;
        } else if (toggleObjects.value.every((objToggle: any) => !objToggle.includes(`loc`))) {
            globalLoc.value = false;
        }
    }
);
</script>
