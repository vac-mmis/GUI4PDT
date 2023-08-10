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
                        <ControlButtons :commands="elevationMapCommands" />
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <h1 class="text-subtitle-1">Objects</h1>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <!-- Global object controls -->
                        <ControlButtons
                            :commands="globalObjectsCommands"
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
                                    :commands="objectCommands(item)"
                                    :key="updateObjects"
                                    @update="
                                        (u) => {
                                            updateGlobal += u;
                                        }
                                    "
                                >
                                    <h2 class="text-subtitle-2">Object {{ item.id }}</h2>
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
import { Command } from "@/components/Utils/Command";

import type { PDTObject } from "@/models/object.model";
import type { ElevationMap } from "@/models/elevation.model";
import PDTStore from "@/store/pdt.store";

const { getPDT } = storeToRefs(PDTStore());
const elevationMap: ComputedRef<ElevationMap | undefined> = computed(() =>
    getPDT.value.getElevationMap()
);
const objects: ComputedRef<PDTObject[]> = computed(() => getPDT.value.getObjects());

const openList = ref(false);
const toggleList = () => {
    openList.value = !openList.value;
};

const updateObjects = ref(0);
const updateGlobal = ref(0);

const objectCommands = (object: PDTObject): Command<boolean>[] => {
    return [
        new Command<boolean>(
            "display",
            "fas fa-object-group",
            "Class",
            object.getObjectVisibility,
            (visibility: boolean) => object.setObjectVisibility(visibility)
        ),
        new Command<boolean>(
            "loc",
            "fas fa-crosshairs",
            "Location",
            object.getLocationVisibility,
            (visibility: boolean) => object.setLocationVisibility(visibility)
        ),
    ];
};

const elevationMapCommands = elevationMap.value
    ? [
          new Command<boolean>(
              "surface",
              "fas fa-water",
              "Surface",
              elevationMap.value?.getMapVisibility,
              (visibility: boolean) => elevationMap.value?.setMapVisibility(visibility)
          ),
          new Command<boolean>(
              "variations",
              "fas fa-chart-simple",
              "Z-variations",
              elevationMap.value?.getMapVariationVisibility,
              (visibility: boolean) => elevationMap.value?.setMapVariationVisibility(visibility)
          ),
      ]
    : [];

const globalObjectsCommands = Command.buildGlobalBooleanCommand(
    objects.value.map((object) => objectCommands(object))
);
</script>
