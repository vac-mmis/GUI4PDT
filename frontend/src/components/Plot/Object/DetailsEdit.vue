<template>
    <v-card v-if="dist && property" elevation="0">


        <v-card-title>Edit {{ property }}:</v-card-title>

        <v-row>
            <v-col>
                <v-select v-model="selectedDistribution" density="compact" :items="getPropertyDistributions"
                    item-title="displayName" item-value="id" label="Distribution:"></v-select>

            </v-col>
        </v-row>


        <v-row v-if="selectedDistribution" v-for="(value, index) in distributionTypes[selectedDistribution]['groups']"
            key="index">
            <v-col>
                <v-row v-if="value['name']">
                    <v-col>
                        <v-label>
                            {{ value['name'] }}
                        </v-label>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col v-for="(comp, index) in value['component']" :key="index">

                       
                        <component v-if="comp" :is="Vector3" :value="distToValue(value['name'], dist,comp)" />

                    </v-col>
                </v-row>
            </v-col>

        </v-row>
    </v-card>
</template>



<script lang="ts" setup>

import { computed, ref, onBeforeMount } from "vue";
import { Distribution } from "@/models/Distributions";



import Vector3 from "@/components/EditInputComponents/Vector3.vue";
import Vector2 from "@/components/EditInputComponents/Vector2.vue";
import Matrix3_3 from "@/components/EditInputComponents/Matrix3_3.vue";
import Combo from "@/components/EditInputComponents/Combo.vue";
import ComboWithValue from "@/components/EditInputComponents/ComboWithValue.vue";
import Number from "@/components/EditInputComponents/Number.vue";
import StringFormElement from "@/components/EditInputComponents/StringFormElement.vue";





const props = defineProps<{
    property: string;
    dist: Distribution | number[] | number | string;
}>();


const applyChanges = async () => {

};



const distToValue = (name: string, dist: Distribution | number[] | number | string, componentType:string) => {

   console.log(componentType);
   
    console.log(name);
    if (name === "none") {
        return { value: dist };
    }

    
  

    
    if (typeof dist === "object" && "type" in dist) {
        if (name in dist) {
            return { value: ((dist as Record<string,any>)[name]) };
        }
    }





    return {}

};




const selectedDistribution = ref<string>();



const getDistributions = () => [

    {
        id: "multivariateNormal",
        displayName: "multivariate-normal"
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


]

const getPropertyDistributions = computed(() => {
    return (propertiesBlueprint[props.property].distributions as string[]).map((dist) => {
        return getDistributions().find((d) => d.id === dist);

    })
});




const propertiesBlueprint: Record<string, any> = {
    "class": {
        name: "Class",
        distributions: ["categorical", "noneCombo"],
        comboboxDefault: ["combo1","combo2","combo3"],

    },
    "material": {
        name: "Material",
        distributions: ["categorical", "noneCombo"],

    },
    "location": {
        name: "Location",
        distributions: ["multivariateNormal", "uniformContinous", "noneVector3"],

    },
    "rotation": {
        name: "Rotation",
        distributions: ["vonMises", "noneVector3"],

    },
    "scale": {
        name: "Scale",
        distributions: ["noneNumber"],
    },
}

const distributionTypes: Record<string, any> = {
   
    noneString: {
        name: "none",
        groups: [
            {
                name: "none",
                components: "String",
                multiple: false,
            }
        ],
    },
    noneCombo: {
        name: "none",
        groups: [
            {
                name: "none",
                component: "Combo",
                multiple: false,
            }
        ],
    },
    noneVector3: {
        name: "none",
        groups: [
            {
                name: "none",
                component: "Vector3",
                multiple: false,
            }
        ],
    },
    noneNumber: {
        name: "none",
        groups: [
            {
                name: "none",
                component:"Number",
                multiple: false,
            },

        ],
    },
    categorical: {
        name: "categorical",
        groups: [
            {
                name: "mass",
                component: "ComboWithValue",
                multiple: true,
                
            }
        ],
    },
    multivariateNormal: {
        name: "multivariate-normal",
        groups: [
            {
                name: "mean",
                component: "Vector_3",
                multiple: false,
            },
            {
                name: "covariance",
                component: "Matrix3_3",
                multiple: false,
            }

        ],
    },
    uniformContinous: {
        name: "uniform-continous",
        groups: [
            {
                name: "params", //TODO when multiple take default from json , like how many  are there
                component: "Vector2",
                multiple: true,
            },

        ],
    },
    vonMises: {
        name: "von-mises",
        groups: [
            {
                name: "mean",
                component: "Vector3",
                multiple: false,
            },
            {
                name: "kappa",
                component: "Vector3",
                multiple: false,
            }

        ],
    },
}



onBeforeMount(async () => {
    const dist = props.dist as Distribution;



    const type = dist?.type;






    
    if (type) {
        selectedDistribution.value = getDistributions().find((d) => d.displayName === type)?.id;
    } else {

        if (typeof dist === "number") {
            selectedDistribution.value = getDistributions().find((d) => d.id === "noneNumber")?.id;
        }
        if (typeof dist === "string") {
            selectedDistribution.value = getDistributions().find((d) => d.id === "noneString")?.id;
        } 
        if (Array.isArray(dist) && dist.length === 3) {
            selectedDistribution.value = getDistributions().find((d) => d.id === "noneVector3")?.id;
        }

    }

    console.log(selectedDistribution.value);


});








</script>

<style scoped></style>