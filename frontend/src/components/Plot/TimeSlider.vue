<template>
    <v-sheet class="d-flex justify-center align-center w-100 h-auto z-1 px-4">
        <v-btn color="primary" icon @click="toggleAnimation()">
            <font-awesome-icon :icon="play ? ['fas', 'pause'] : ['fas', 'play']" />
        </v-btn>
        <v-slider
            :class="`w-100 align-center ${play ? `text-grey-lighten-1` : `text-black`} my-4`"
            v-model="slider"
            :color="play ? `grey` : `primary`"
            show-ticks="always"
            hide-details
            :readonly="play"
            :min="0"
            :max="timeLength"
            :step="1"
            :ticks="ticks"
            thumb-label
        >
            <template v-slot:prepend>
                <v-btn
                    variant="text"
                    icon
                    color="primary"
                    :disabled="play"
                    @click="slider >= 1 ? slider-- : 0"
                >
                    <font-awesome-icon :icon="['fas', 'minus']" />
                </v-btn>
            </template>
            <template v-slot:append>
                <v-btn
                    variant="text"
                    icon
                    color="primary"
                    :disabled="play"
                    @click="slider <= timeLength - 1 ? slider++ : timeLength"
                >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </v-btn>
            </template>
        </v-slider>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed, toRaw, watch } from "vue";
import type { Timer } from "@/World/systems/Timer";

const props = defineProps<{ timer?: Timer }>();
// TODO : Get timeLength from PDT
const timeLength = 1000;

const updateSlider = (t: number) => {
    slider.value = t % timeLength;
};

const timer = computed(() => {
    const propsTimer = props.timer;
    propsTimer?.setTimerCallback(updateSlider);
    return toRaw(propsTimer);
});

const slider = ref(timer.value?.getTime() || 0);
const play = ref(false);

const ticks = Array.from({ length: 5 }, (_, x) => (timeLength * x) / 4).reduce(
    (o, key) => Object.assign(o, { [key]: `${key}` }),
    {}
);

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
        if (!play.value) {
            timer.value?.setTime(t);
        }
    }
);
</script>
