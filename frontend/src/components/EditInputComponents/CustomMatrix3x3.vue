<template>
    <div class="vector-input no-spinners">
        <input v-model="x11" type="number" placeholder="X11" />
        <input v-model="x12" type="number" placeholder="X12" />
        <input v-model="x13" type="number" placeholder="X13" />
    </div>
    <div class="vector-input no-spinners">
        <input v-model="x21" type="number" placeholder="X21" />
        <input v-model="x22" type="number" placeholder="X22" />
        <input v-model="x23" type="number" placeholder="X23" />
    </div>
    <div class="vector-input no-spinners">
        <input v-model="x31" type="number" placeholder="X31" />
        <input v-model="x32" type="number" placeholder="X32" />
        <input v-model="x33" type="number" placeholder="X33" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
    value: any;
}>();

const x11 = ref(props.value[0][0] || 0);
const x12 = ref(props.value[0][1] || 0);
const x13 = ref(props.value[0][2] || 0);

const x21 = ref(props.value[1][0] || 0);
const x22 = ref(props.value[1][1] || 0);
const x23 = ref(props.value[1][2] || 0);

const x31 = ref(props.value[2][0] || 0);
const x32 = ref(props.value[2][1] || 0);
const x33 = ref(props.value[2][2] || 0);



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

.vector-input {
    display: flex;
}

.vector-input input {
    width: 50px;
    margin: 2px;
    border: 1px solid #ccc;
}
</style>