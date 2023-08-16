<template>
    <v-sheet class="d-flex justify-center align-center w-100 h-auto z-11 px-4">
        <v-btn
            color="primary"
            size="large"
            @click="toggleAnimation()"
            :icon="play ? 'fas fa-pause' : 'fas fa-play'"
        >
        </v-btn>
        <v-slider
            v-model="slider"
            class="w-100 align-center my-4"
            color="primary"
            :disabled="play"
            show-ticks="always"
            hide-details
            :readonly="play"
            :min="0"
            :max="timeLength - 1"
            :ticks="ticks"
            thumb-label
        >
            <template v-slot:prepend>
                <v-btn
                    variant="text"
                    size="small"
                    icon="fas fa-backward-step"
                    color="primary"
                    :disabled="play || slider < 1"
                    @click="slider >= 1 ? slider-- : 0"
                >
                </v-btn>
            </template>
            <template v-slot:append>
                <v-btn
                    variant="text"
                    size="small"
                    icon="fas fa-forward-step"
                    color="primary"
                    :disabled="play || slider > timeLength - 2"
                    @click="slider <= timeLength - 2 ? slider++ : timeLength"
                >
                </v-btn>
            </template>
        </v-slider>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed, toRaw, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";

import PDTStore from "@/store/pdt.store";
import WorldStore from "@/store/world.store";

const { timeLength } = storeToRefs(PDTStore());
const { getTimer } = storeToRefs(WorldStore());
const { setStatus } = WorldStore();

const emits = defineEmits<(e: "time", time: number) => void>();

const updateSlider = (t: number) => {
    slider.value = t % timeLength.value;
};

const timer = computed(() => {
    const propsTimer = getTimer.value;
    propsTimer?.setTimerCallback(updateSlider);
    return toRaw(propsTimer);
});

const slider = ref<number>(timer.value?.getTime() ?? 0);
const ticks = Array.from(
    {
        length: timeLength.value / 10 + 1,
    },
    (_, x) => 10 * x
).reduce((o, key) => Object.assign(o, { [key]: `${key}` }), {});

const play = ref(false);
const toggleAnimation = () => {
    play.value = !play.value;
    if (play.value) {
        timer.value?.start();
    } else {
        timer.value?.stop();
    }
};

watch(
    () => slider.value,
    (t: number) => {
        emits("time", slider.value);
        if (!play.value) {
            timer.value?.setTime(t);
        }
    }
);

onMounted(() => {
    setStatus({ status: "success", message: "Scene loaded successfully" });
});
</script>
