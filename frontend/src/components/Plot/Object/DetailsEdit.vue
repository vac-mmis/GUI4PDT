<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<!-- eslint-disable vue/valid-v-for -->
<template>
    <v-card
        v-if="dist && property"
        elevation="0"
        :title="'Edit ' + property + ':'"
        class="card-container"
    >
        <v-card-item>
            <v-select
                v-model="selectedDistribution"
                density="compact"
                :items="getPropertyDistributions"
                item-title="displayName"
                item-value="id"
                label="Distribution:"
            ></v-select>
        </v-card-item>

        <v-card-item>
            <v-row
                v-if="selectedDistribution"
                v-for="(value, index) in distributionTypes[selectedDistribution]['groups']"
                key="index"
            >
                <v-col>
                    <v-row>
                        <v-col>
                            <v-btn icon="fas fa-plus" variant="text" @click="addGroup" />
                            <v-btn icon="fas fa-minus" variant="text" @click="removeGroup" />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            {{ value["name"] }}
                        </v-col>

                        <v-col>
                            <component
                                v-if="value['component']"
                                :is="value['component']"
                                :value="distToValue(value['name'], dist, value['component'])"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            {{ value["name"] }}
                        </v-col>

                        <v-col>
                            <component
                                v-if="value['component']"
                                :is="value['component']"
                                :value="distToValue(value['name'], dist, value['component'])"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            {{ value["name"] }}
                        </v-col>

                        <v-col>
                            <component
                                v-if="value['component']"
                                :is="value['component']"
                                :value="distToValue(value['name'], dist, value['component'])"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-item>

        <v-card-item class="text-right">
            <v-btn append-icon="fas" color="primary" density="compact" elevation="8" rounded="xs">
                Save</v-btn
            >
        </v-card-item>
    </v-card>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount } from "vue";
import { Distribution } from "@/models/Distributions";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";

const models = modelStore();
const materials = materialStore();

const props = defineProps<{
    property: string;
    dist: Distribution | number[] | number | string;
}>();

const distToValue = (
    name: string,
    dist: Distribution | number[] | number | string,
    componentType: string
) => {
    //TODO GIVE CORRECT START VALUES FOR EACH COMPONENT

    if (name === "none") {
        return dist;
    }

    if (typeof dist === "object" && "type" in dist) {
        if (name in dist) {
            return (dist as Record<string, any>)[name];
        }
    }

    return {};
};

//TODO add group with element and group id in UI
function addGroup() {}

function removeGroup() {}

const selectedDistribution = ref<string>();

const getPropertyDistributions = computed(() => {
    return (propertiesBlueprint[props.property].distributions as string[]).map((dist) => {
        return { id: dist, displayName: distributionTypes[dist]["name"] };
    });
});

const propertiesBlueprint: Record<string, any> = {
    class: {
        name: "Class",
        distributions: ["categorical", "noneCombo"],
        items: models.getModels(),
    },
    material: {
        name: "Material",
        distributions: ["categorical", "noneCombo"],
        items: materials.getMaterials(),
    },
    location: {
        name: "Location",
        distributions: ["multivariateNormal", "uniformContinous", "noneVector3"],
    },
    rotation: {
        name: "Rotation",
        distributions: ["vonMises", "noneVector3"],
    },
    scale: {
        name: "Scale",
        distributions: ["noneNumber"],
    },
};

const distributionTypes: Record<string, any> = {
    noneString: {
        name: "none",
        groups: [
            {
                name: "none",
                component: "String",
                multiple: false,
            },
        ],
    },
    noneCombo: {
        name: "none",
        groups: [
            {
                name: "none",
                component: "Combo",
                multiple: false,
            },
        ],
    },
    noneVector3: {
        name: "none",
        groups: [
            {
                name: "none",
                component: "Vector3",
                multiple: false,
            },
        ],
    },
    noneNumber: {
        name: "none",
        groups: [
            {
                name: "none",
                component: "Number",
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
            },
        ],
    },
    multivariateNormal: {
        name: "multivariate-normal",
        groups: [
            {
                name: "mean",
                component: "Vector3",
                multiple: false,
            },
            {
                name: "cov",
                component: "Matrix3_3",
                multiple: false,
            },
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
            },
        ],
    },
};

onBeforeMount(async () => {
    const dist = props.dist as Distribution;

    const type = dist?.type;

    if (type) {
        for (const distributionType in distributionTypes as object) {
            if (distributionTypes[distributionType]["name"] === type) {
                selectedDistribution.value = distributionType;
            }
        }
    } else {
        if (typeof dist === "number") {
            selectedDistribution.value = "noneNumber";
        }
        if (typeof dist === "string") {
            selectedDistribution.value = "noneString";
        }
        if (Array.isArray(dist) && dist.length === 3) {
            selectedDistribution.value = "noneVector3";
        }
    }
});
</script>

<style scoped>
.card-container {
    max-height: 26rem; /* Set maximum height as needed */
    overflow-y: auto; /* Enable vertical scrolling */
}
</style>
