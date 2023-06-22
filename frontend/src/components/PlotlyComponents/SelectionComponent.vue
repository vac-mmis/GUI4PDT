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
                v-model="loc"
                hide-details
                inset
                label="Location Density"
                class="px-6"
            >
            </v-switch>
            <v-expansion-panels class="w-100">
                <v-expansion-panel
                    v-for="(object, index) in props.objects"
                    :key="object.id"
                    :object="object"
                >
                    <v-expansion-panel-title>
                        <div class="d-flex w-100 justify-space-between align-center">
                            <div>Object {{ object.id }}</div>
                            <div>
                                <v-btn-toggle
                                    :v-model="toggle[index]"
                                    multiple
                                    rounded="xl"
                                    @click.stop
                                    bg-secondary
                                >
                                    <v-btn variant="tonal">
                                        <font-awesome-icon :icon="['fas', 'bars']"
                                    /></v-btn>
                                    <v-btn variant="tonal">
                                        <font-awesome-icon :icon="['fas', 'bars']"
                                    /></v-btn>
                                    <v-btn variant="tonal">
                                        <font-awesome-icon :icon="['fas', 'bars']"
                                    /></v-btn>
                                </v-btn-toggle>
                            </div>
                        </div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <ObjectController :object="object"></ObjectController>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ObjectController from "./Object/ObjectController.vue";
import PDTStore from "@/store/pdt.store";
import ObjectServices from "@/services/object.services";

const PDT = PDTStore();
const props = defineProps(["objects"]);

const openList = ref(false);

const loc = ref(false);

const toggleList = () => {
    openList.value = !openList.value;
};

const toggle = ref([] as string[]);

const toggleGlobalLocation = () => {
    PDT.updatePDT(ObjectServices.toggleLocation(loc.value));
};
</script>
