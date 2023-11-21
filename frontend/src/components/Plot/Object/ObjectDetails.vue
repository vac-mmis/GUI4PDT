<template>
    <v-card
        v-if="opened && getPDT.selectedObject"
        class="card"
        ref="card"
        :title="`Details on object ${getPDT.selectedObject.objID}`"
        prepend-icon="fas fa-cubes"
        elevation="16"
    >
        <template v-slot:append>
            <v-btn
                :icon="maximized ? `$minimize` : `$maximize`"
                variant="text"
                @click="toggleWindow"
            />
            <v-btn icon="$close" variant="text" @click="onClose" />
        </template>

        <v-divider></v-divider>
        <v-card-item v-if="maximized">
            <v-tabs v-model="tab" color="secondary" align-tabs="center">
                <template v-for="key in Object.keys(details)" :key="key">
                    <v-tab :value="key">{{ key }}</v-tab>
                </template>
            </v-tabs>
            <template v-for="key in Object.keys(details)" :key="key">
                <template v-if="tab === key">
                    <PropertyDetails :details="details[key]" />
                </template>
            </template>
        </v-card-item>
    </v-card>
    <Moveable
        :key="maximized ? 1 : 2"
        v-if="opened && getPDT.selectedObject"
        className="moveable"
        :target="['.card']"
        :draggable="true"
        :origin="false"
        :edge="true"
        :hide-default-lines="true"
        @drag="onDrag"
    />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Moveable, { type OnDrag } from "vue3-moveable";
import { storeToRefs } from "pinia";

import PropertyDetails from "@/components/Plot/Object/PropertyDetails.vue";

import { PDTStore } from "@/store/pdt.store";

const { getPDT } = storeToRefs(PDTStore());
const props = defineProps<{
    /**
     * Selected time when show details. Generally come from `TimeSlider` component.
     */
    time: number;
}>();

const details = computed(() => getPDT.value.selectedObject.getDetails(props.time));

const card = ref();
const opened = ref(true);
const maximized = ref(true);

const tab = ref<string>("");

const onClose = () => {
    opened.value = false;
};

const toggleWindow = () => {
    maximized.value = !maximized.value;
};

watch(
    () => getPDT.value.selectedObject,
    () => {
        opened.value = !!getPDT.value.selectedObject;
    }
);

const onDrag = (e: OnDrag) => {
    
    
    e.target.style.transform = e.transform;
};
</script>
