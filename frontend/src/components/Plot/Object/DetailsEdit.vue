<template>
    <v-card v-if="pdtObject && property" elevation="0">


        <v-card-title>Edit {{ property }}:</v-card-title>

        <v-row>
            <v-col>
                <v-select v-if="selectedDistribution" v-model="selectedDistribution" density="compact"
                    :items="getDistributions"  item-title="displayName" item-value="id" label="Distribution:"></v-select>
            </v-col>
        </v-row>


    </v-card>
</template>



<script lang="ts" setup>

import { computed, ref } from "vue";
import { type Distribution } from "@/models/Distributions";
import { type PDTObject } from "@/models/object.model";
import { type Location } from "@/models/Properties/Location";
import type { Rotation } from "@/models/Properties/Rotation";
import { Material } from "@/models/Properties/Material";
import type { Class } from "@/models/Properties/Class";

const props = defineProps<{
    property: string;
    pdtObject: PDTObject;
}>();


const applyChanges = async () => {

}



const getDistributions = computed(() => [

    {
        id: "multivariantNormal",
        displayName: "multivariant-normal"
    },
    {
        id: "noneVector3",
        displayName: "none"
    },
    {
        id: "uniformContinous",
        displayName: "uniform-continous"
    },
    {
        id: "vonMises",
        displayName: "von-mises"
    },
    {
        id: "noneNumber",
        displayName: "none"
    },
    {
        id: "categorical",
        displayName: "categorical"
    },
    {
        id: "noneCombo",
        displayName: "none"
    },
    {
        id: "noneString",
        displayName: "none"
    }


]);



const propertiesBlueprint = {
    class: {
        name: "Class",
        distributions: ["categorical", "noneCombo"],

    },
    material: {
        name: "Material",
        distributions: ["categorical", "noneCombo"],

    },
    location: {
        name: "Location",
        distributions: ["multivariantNormal", "uniformContinous", "noneVector3"],
        default: (props.pdtObject.children[1] as Location).dist
    },
    rotation: {
        name: "Rotation",
        distributions: ["vonMises", "noneVector3"],

    },
    scale: {
        name: "Scale",
        distributions: ["noneNumber"],
    },
}

const distributionTypes = {
    categorical: {
        name: "categorical",
        groups: [
            {
                name: "",
                components: ["combobox", "number"],
                multiple: true,
            }
        ],
    },
    noneString: {
        name: "none",
        groups: [
            {
                name: "",
                components: ["string"],
                multiple: false,
            }
        ],
    },
    noneCombo: {
        name: "none",
        groups: [
            {
                name: "",
                components: ["combobox"],
                multiple: false,
            }
        ],
    },
    noneVector3: {
        name: "none",
        groups: [
            {
                name: "",
                components: ["vector3"],
                multiple: false,
            }
        ],
    },
    noneNumber: {
        name: "none",
        groups: [
            {
                name: "",
                components: ["number"],
                multiple: false,
            },

        ],
    },
    multivariantNormal: {
        name: "multivariant-normal",
        groups: [
            {
                name: "mean",
                type: ["vector3"],
                multiple: false,
            },
            {
                name: "covariance",
                type: ["matrix3_3"],
                multiple: false,
            }

        ],
    },
    uniformContinous: {
        name: "uniform-continous",
        groups: [
            {
                name: "params",
                type: ["vector2", "vector2", "vector2"],
                multiple: false,
            },

        ],
    },
    vonMises: {
        name: "von-mises",
        groups: [
            {
                name: "mean",
                type: ["vector3"],
                multiple: false,
            },
            {
                name: "kappa",
                type: ["vector3"],
                multiple: false,
            }

        ],
    },
}

const selectedDistribution = ref("");
if (props.property === "location") {
    selectedDistribution.value = ((props.pdtObject.children[1] as Location).dist[0] as Distribution).type || "none";
} else if (props.property === "rotation") {
    selectedDistribution.value = ((props.pdtObject.children[2] as Rotation).dist[0] as Distribution).type || "none";
} else if (props.property === "material") {
    selectedDistribution.value = ((props.pdtObject.material as Material).dist[0] as Distribution).type || "none";
} else if (props.property === "class") {
    selectedDistribution.value = ((props.pdtObject.class as Class).dist[0] as Distribution).type || "none";
} else if (props.property === "scale") {
    
    selectedDistribution.value = ("none");
} else {
    selectedDistribution.value = ("none");
}





console.log(selectedDistribution.value);







</script>

<style scoped>
.no-spinners ::-webkit-inner-spin-button,
.no-spinners ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.no-spinners {
    -moz-appearance: textfield;
}
</style>