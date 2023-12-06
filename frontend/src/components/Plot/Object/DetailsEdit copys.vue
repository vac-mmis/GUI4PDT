<template>
    <v-card min-height="500" width="500">
        <v-card-title>Edit Object</v-card-title>


        <v-row class="p-0 m-0">
            <v-col>
                <v-card-text>
                    <strong>Class: </strong>
                </v-card-text>

            </v-col>
            <v-col>
                <v-select v-model="selectedClassDist" density="compact" :items="classDist"
                    label="Choose an option"></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card-text>
                    <strong>Material: </strong>
                </v-card-text>
            </v-col>
            <v-col>

                <v-select v-model="selectedmaterialDist" density="compact" :items="materialDist"
                    label="Choose an option"></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card-text>
                    <strong>Location: </strong>
                </v-card-text>

            </v-col>
            <v-col>

                <v-select v-model="selectedlocationDist" density="compact" :items="locationDist"
                    label="Choose an option"></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card-text>
                    <strong>Rotation: </strong>
                </v-card-text>

            </v-col>
            <v-col>

                <v-select v-model="selectedrotationDist" density="compact" :items="rotationDist"
                    label="Choose an option"></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card-text>
                    <strong>Scale: </strong>
                </v-card-text>

            </v-col>
            <v-col>
                <v-text-field v-model="scaleValue" label="Enter Value"></v-text-field>
            </v-col>
        </v-row>



        <v-card-actions>
            <v-btn color="primary" @click="getDist"> Apply </v-btn>
        </v-card-actions>

    </v-card>
</template>


<script lang="ts" setup>

import { ref } from "vue";
import { storeToRefs } from "pinia";

import { PDTStore } from "@/store/pdt.store";

const { getPDT } = storeToRefs(PDTStore());


//props for passing data

// const props = defineProps<{
//     tab: string;
// }>(); 


const selectedObject = getPDT.value.selectedObject;
const selectedOptions = ref<string>("Vector A");

const selectedClassDist = ref<string>();
const selectedmaterialDist = ref<string>();
const selectedlocationDist = ref<string>();
const selectedrotationDist = ref<string>();

const scaleValue = ref<number>();


const classDist = ["categorical", "none"];
const materialDist = ["categorical", "none"];
const locationDist = ["multivariant-normal", "uniform-continous", "none"];
const rotationDist = ["von-mises", "none"];

const getDist = () => {
    console.log(Array.isArray(selectedObject._location.dist[0]))



    console.log(selectedObject._location.dist[0].type)

}




</script>
