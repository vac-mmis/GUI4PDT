<template>
    <div class="vector-input no-spinners">
        <input v-model="x" type="number" placeholder="X" />
        <input v-model="y" type="number" placeholder="Y" />
        <input v-model="z" type="number" placeholder="Z" />
    </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';




const props = defineProps<{
    value: any;
}>();

const x = ref(props.value[0] || 0);
const y = ref(props.value[1] || 0);
const z = ref(props.value[2] || 0);

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