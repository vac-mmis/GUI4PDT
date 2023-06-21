<template>
    <v-switch
        class="w-full"
        v-model="model"
        hide-details
        inset
        :label="`Switch: ${model.toString()} ${object.id}`"
    ></v-switch>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps(["object"]);
const object = computed(() => props.object);
const model = ref(false);
</script>
