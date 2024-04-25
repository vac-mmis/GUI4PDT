<template>
    <v-combobox :v-model="selected" :label="name" :items="items">

    </v-combobox>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
    value: any
}>();

const selected = ref(props.value.selected || "");
const items = ref(props.value.items || []);
const name = ref(props.value.name || "No_Name");


</script>

<style scoped></style>