<template>
    <v-switch
        v-model="loc"
        @change="emitStatus"
        hide-details
        inset
        label="Location Density"
    ></v-switch>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const loc = ref(false);
const emit = defineEmits(["location-status"]);

const emitStatus = () => {
    emit("location-status", loc.value);
};
</script>
