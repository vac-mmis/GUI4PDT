<template>
    <div class="h-full" :class="openList ? `w-25` : ``">
        <v-toolbar class="w-100" :collapse="!openList" title="Objects">
            <v-app-bar-nav-icon @click="toggleList">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </v-app-bar-nav-icon>
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
                    <v-card-title class="text-h6">Object {{ object.id }}</v-card-title>
                    <v-card-actions>
                        <v-btn-toggle
                            v-model="toggleObjects[index]"
                            multiple
                            rounded="xl"
                            color="secondary"
                        >
                            <v-btn value="display">
                                <font-awesome-icon :icon="['fas', 'eye']" />
                                <v-tooltip activator="parent" location="bottom">
                                    Show object
                                </v-tooltip>
                            </v-btn>
                            <v-btn value="loc" @click="toggleObjectLocation(object.id)">
                                <font-awesome-icon :icon="['fas', 'location-crosshairs']" />
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
import { ref } from "vue";
import PDTStore from "@/store/pdt.store";
import { onMounted } from "vue";
import type { PDTObject } from "@/models/object.model";
import { toggleLocation } from "@/models/location.model";

const PDT = PDTStore();
const objects = ref([] as PDTObject[]);

const openList = ref(false);
const toggleList = () => {
    openList.value = !openList.value;
};

const globalLoc = ref(false);

const toggleObjects = ref([[]] as string[][]);

const toggleGlobalLocation = () => {
    PDT.updateObjects(toggleLocation(globalLoc.value));
    toggleObjects.value.forEach((objToggle) => {
        const index = objToggle.indexOf("loc");
        if (globalLoc.value && index < 0) {
            objToggle.push("loc");
        }
        if (!globalLoc.value && index > -1) {
            objToggle.splice(index);
        }
    });
    if (toggleObjects.value.every((objToggle: any) => objToggle.includes(`loc`))) {
        globalLoc.value = true;
    } else if (toggleObjects.value.every((objToggle: any) => !objToggle.includes(`loc`))) {
        globalLoc.value = false;
    }
};

const toggleObjectLocation = (objectID: number) => {
    PDT.updateObject(objectID, toggleLocation(toggleObjects.value[objectID].includes("loc")));
};

onMounted(() => {
    objects.value = PDT.getObjects();
    toggleObjects.value.length = objects.value.length;
    toggleObjects.value.fill([], 0, objects.value.length);
});
</script>
