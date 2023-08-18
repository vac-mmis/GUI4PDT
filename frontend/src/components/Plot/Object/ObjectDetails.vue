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
                <v-tab :value="0">Class</v-tab>
                <!-- TODO : Implement location details -->
                <!-- <v-tab :value="1">Location</v-tab> -->
                <v-tab :value="2">Material</v-tab>
            </v-tabs>
            <template v-if="tab === 0">
                <ObjectPlot :data="[getPDT.selectedObject.class.representation(props.time)]" />
            </template>
            <template v-if="tab === 2">
                <ObjectPlot :data="[getPDT.selectedObject.material.representation(props.time)]" />
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
        @drag="onDrag"
    />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import Moveable, { type OnDrag } from "vue3-moveable";
import { storeToRefs } from "pinia";

import ObjectPlot from "@/components/Plot/Object/ObjectPlot.vue";

import PDTStore from "@/store/pdt.store";

const { getPDT } = storeToRefs(PDTStore());
const props = defineProps<{ time: number }>();

const card = ref();
const opened = ref(true);
const maximized = ref(true);

const tab = ref<number>(0);

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
