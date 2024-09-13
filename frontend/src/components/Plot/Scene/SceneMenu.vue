<template>
    <div :class="`${openMenu ? `w-auto` : ``}`">
        <!-- Toolbar -->
        <v-toolbar class="w-100" :collapse="!openMenu" title="PDT Menu">
            <!-- <v-btn v-if="openMenu" @click="changePDT" icon="">
                <v-icon icon="far fa-folder-open" />
                <v-tooltip activator="parent" location="bottom" text="Change PDT" />
            </v-btn> -->
            <v-app-bar-nav-icon @click="() => (openMenu = !openMenu)"></v-app-bar-nav-icon>
        </v-toolbar>

        <v-sheet v-if="openMenu && getPDT.name" class="w-full h-full">
            <v-expansion-panels>
                <!-- Elevation map control -->
                <v-expansion-panel v-if="elevationMapControllers">
                    <v-expansion-panel-title>
                        <h1 class="text-subtitle-1">Elevation Map</h1>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <ControlButtons :controllers="elevationMapControllers" />
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <!-- Objects list -->
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

import ControlButtons from "@/components/Generics/ControlButtons.vue";
import { Controller } from "@/models/Controls/Controller";

import type { PDTObject } from "@/models/object.model";
import type { Map } from "@/models/map.model";
import { PDTStore } from "@/store/pdt.store";

const { getPDT } = storeToRefs(PDTStore());

const openMenu = ref(false);

// Objects to control
const elevationMaps: ComputedRef<Map[] | undefined> = computed(() =>
    getPDT.value.getElevationMaps()
);
const objects: ComputedRef<PDTObject[]> = computed(() => getPDT.value.getObjects());

// Updaters
const updateObjects = ref(0);
const updateGlobal = ref(0);

// Controllers
const objectControllers = (object: PDTObject): Controller<any>[] => object.getControllers();
const elevationMapControllers = elevationMaps.value?.map((elevation_map) =>
    elevation_map.getController()
);

const globalObjectsControllers = Controller.buildGlobalBooleanController(
    objects.value.map((object) => objectControllers(object))
);
</script>
