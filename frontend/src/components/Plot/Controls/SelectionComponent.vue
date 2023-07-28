<template>
    <div :class="openList ? `w-auto` : ``">
        <v-toolbar class="w-100" :collapse="!openList" title="Objects">
            <v-app-bar-nav-icon @click="toggleList"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-sheet class="border w-full h-full" v-if="openList">
            <v-card class="d-flex w-100 pa-2 justify-space-between align-center mx-auto">
                <v-card-title class="text-h6">Global</v-card-title>
                <v-card-actions>
                    <ControlButtons
                        :commands="globalCommands"
                        :key="updateGlobal"
                        @update="
                            (u) => {
                                updateObjects += u;
                            }
                        "
                    />
                </v-card-actions>
            </v-card>

            <v-card
                v-for="object in objects"
                :key="object.id"
                class="d-flex w-100 pa-2 justify-space-between align-center mx-auto"
            >
                <v-card-title class="text-h6">Object {{ object.id }}</v-card-title>
                <v-card-actions>
                    <ControlButtons
                        :commands="commands(object)"
                        :key="updateObjects"
                        @update="
                            (u) => {
                                updateGlobal += u;
                            }
                        "
                    />
                </v-card-actions>
            </v-card>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, type ComputedRef } from "vue";
import ControlButtons from "@/components/Plot/Controls/ControlButtons.vue";
import { Command } from "@/components/Utils/Command";

import type { PDTObject } from "@/models/object.model";
import PDTStore from "@/store/pdt.store";

const pdt = PDTStore();
const objects: ComputedRef<PDTObject[]> = computed(() => pdt.getObjects());

const openList = ref(false);
const toggleList = () => {
    openList.value = !openList.value;
};

const updateObjects = ref(0);
const updateGlobal = ref(0);

const commands = (object: PDTObject): Command<boolean>[] => {
    return [
        new Command(
            "display",
            "fas fa-eye",
            "Show object",
            object.getObjectVisibility,
            (visibility: boolean) => object.setObjectVisibility(visibility)
        ),
        new Command(
            "loc",
            "fas fa-crosshairs",
            "Show location",
            object.getLocationVisibility,
            (visibility: boolean) => object.setLocationVisibility(visibility)
        ),
    ];
};

const globalCommands = Command.buildGlobalBooleanCommand(
    objects.value.map((object) => commands(object))
);
</script>
