<template>
    <v-combobox :v-model="selected" :label="name" :items="items">

    </v-combobox>
    <input v-model="x" type="number" placeholder="value" />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';


const props = defineProps<{
    value: any
}>();


const x = ref(props.value.x || 0);

const selected = ref(props.value.selected || "");
const items = ref(props.value.items || []);
const name = ref(props.value.name || "No_Name");


</script>

<style scoped></style>