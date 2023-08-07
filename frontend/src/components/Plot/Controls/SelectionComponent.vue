<template>
    <div :class="openList ? `w-auto` : ``">
        <v-toolbar class="w-100" :collapse="!openList" :title="getPDT.name">
            <v-app-bar-nav-icon @click="toggleList"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-list class="w-full h-full" v-if="openList">
            <v-list-item v-if="elevationMap">
                <!-- Elevation map control -->
                <ControlButtons :commands="elevationMapCommands">
                    <h1 class="text-subtitle-1">Elevation Map</h1>
                </ControlButtons>
            </v-list-item>

            <v-divider></v-divider>
            <!-- Global object controls -->
            <v-list-group value="Objects">
                <template v-slot:activator="{ isOpen, props }">
                    <v-list-item>
                        <ControlButtons
                            :commands="globalObjectsCommands"
                            :key="updateGlobal"
                            @update="
                                (u) => {
                                    updateObjects += u;
                                }
                            "
                        >
                            <h1 class="text-subtitle-1">Objects</h1>
                        </ControlButtons>
                        <template v-slot:append>
                            <v-btn
                                v-bind="props"
                                :icon="isOpen ? `fas fa-minus` : `fas fa-plus`"
                                variant="text"
                            ></v-btn>
                        </template>
                    </v-list-item>
                </template>

                <!-- Individual object controls -->
                <v-virtual-scroll :items="objects" height="480" item-height="48">
                    <template v-slot:default="{ item }">
                        <v-list-item>
                            <ControlButtons
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
                        </v-list-item>
                    </template>
                </v-virtual-scroll>
            </v-list-group>
        </v-list>
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
            "fas fa-eye",
            "Show object",
            object.getObjectVisibility,
            (visibility: boolean) => object.setObjectVisibility(visibility)
        ),
        new Command<boolean>(
            "loc",
            "fas fa-crosshairs",
            "Show location",
            object.getLocationVisibility,
            (visibility: boolean) => object.setLocationVisibility(visibility)
        ),
    ];
};

const elevationMapCommands = elevationMap.value
    ? [
          new Command<boolean>(
              "surface",
              "fas fa-eye",
              "Show surface",
              elevationMap.value.getMapVisibility,
              (visibility: boolean) => elevationMap.value?.setMapVisibility(visibility)
          ),
          new Command<boolean>(
              "variations",
              "fas fa-chart-simple",
              "Show variations",
              elevationMap.value.getMapVariationVisibility,
              (visibility: boolean) => elevationMap.value?.setMapVariationVisibility(visibility)
          ),
      ]
    : [];

const globalObjectsCommands = Command.buildGlobalBooleanCommand(
    objects.value.map((object) => objectCommands(object))
);
</script>
