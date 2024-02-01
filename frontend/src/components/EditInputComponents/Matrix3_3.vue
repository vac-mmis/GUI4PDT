<template>
    <div class="vector-input no-spinners">
        <row>
            <input v-model="x1" type="number" placeholder="X1" />
            <input v-model="x2" type="number" placeholder="X2" />
            <input v-model="x3" type="number" placeholder="X3" />
        </row>
        <row>
            <input v-model="y1" type="number" placeholder="Y1" />
            <input v-model="y2" type="number" placeholder="Y2" />
            <input v-model="y3" type="number" placeholder="Y3" />
        </row>
        <row>
            <input v-model="z1" type="number" placeholder="Z1" />
            <input v-model="z2" type="number" placeholder="Z2" />
            <input v-model="z3" type="number" placeholder="Z3" />
        </row>




    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
    value: any;
}>();

const x1 = ref(props.value[0][0] || 0);
const x2 = ref(props.value[1][0] || 0);
const x3 = ref(props.value[2][0] || 0);

const y1 = ref(props.value[0][1] || 0);
const y2 = ref(props.value[1][1] || 0);
const y3 = ref(props.value[2][1] || 0);

const z1 = ref(props.value[0][2] || 0);
const z2 = ref(props.value[1][2] || 0);
const z3 = ref(props.value[2][2] || 0);

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
    margin-right: 5px;
}
</style>