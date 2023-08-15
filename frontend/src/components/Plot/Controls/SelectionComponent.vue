<template>
    <div :class="`${openList ? `w-auto` : ``}`">
        <v-toolbar class="w-100" :collapse="!openList" :title="getPDT.name">
            <v-app-bar-nav-icon @click="toggleList"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-sheet v-if="openList" class="w-full h-full">
            <v-expansion-panels>
                <!-- Elevation map control -->
                <v-expansion-panel v-if="elevationMap">
                    <v-expansion-panel-title>
                        <h1 class="text-subtitle-1">Elevation Map</h1>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <ControlButtons :controllers="elevationMapControllers" />
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <h1 class="text-subtitle-1">Objects</h1>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <!-- Global object controls -->
                        <ControlButtons
                            :controllers="globalObjectsControllers"
                            :key="updateGlobal"
                            @update="
                                (u) => {
                                    updateObjects += u;
                                }
                            "
                        >
                            <h2 class="text-subtitle-2">Global</h2>
                        </ControlButtons>
                        <v-divider></v-divider>
                        <!-- Individual object controls -->
                        <v-virtual-scroll :items="objects" max-height="400" class="pa-2">
                            <template v-slot:default="{ item }">
                                <ControlButtons
                                    class="pa-2"
                                    :controllers="objectControllers(item)"
                                    :key="updateObjects"
                                    @update="
                                        (u) => {
                                            updateGlobal += u;
                                        }
                                    "
                                >
                                    <h2 class="text-subtitle-2">Object {{ item.objID }}</h2>
                                </ControlButtons>
                            </template>
                        </v-virtual-scroll>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, type ComputedRef } from "vue";
import { storeToRefs } from "pinia";

import ControlButtons from "@/components/Plot/Controls/ControlButtons.vue";
import { Controller } from "@/models/Controls/Controller";

import type { PDTObject } from "@/models/object.model";
import type { Map } from "@/models/map.model";
import PDTStore from "@/store/pdt.store";

const { getPDT } = storeToRefs(PDTStore());
const elevationMap: ComputedRef<Map | undefined> = computed(() => getPDT.value.getElevationMap());
const objects: ComputedRef<PDTObject[]> = computed(() => getPDT.value.getObjects());

const openList = ref(false);
const toggleList = () => {
    openList.value = !openList.value;
};

const updateObjects = ref(0);
const updateGlobal = ref(0);

const objectControllers = (object: PDTObject): Controller<any>[] => object.getControllers();

const elevationMapControllers = elevationMap.value
    ? [elevationMap.value?.getSurfaceController(), elevationMap.value?.getVariationsController()]
    : [];

const globalObjectsControllers = Controller.buildGlobalBooleanController(
    objects.value.map((object) => objectControllers(object))
);
</script>
