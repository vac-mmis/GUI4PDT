<template>
    <v-sheet class="d-flex ma-2 flex-column">
        <span class="pr-2">
            <!-- @slot Use this slot header -->
            <slot name="header" />
        </span>
        <div
            class="d-flex flex-row justify-space-between align-center"
            v-for="(controller, i) in controllers"
            :key="`${controller.name}-${controller.state}`"
        >
            <span>
                <v-icon size="small" variant="text" :icon="controller.icon" />
                <span class="px-2">{{ controller.tooltip }}</span>
            </span>
            <div class="d-flex flex-row justify-col align-start">
                <v-btn-toggle
                    v-model="toggle[i]"
                    color="secondary"
                    inline
                    multiple
                    @update:model-value="updateValue(controller, toggle[i])"
                >
                    <v-btn
                        v-for="value in controller.values"
                        :key="value"
                        :value="value"
                        size="small"
                    >
                        <v-icon :icon="Controller.getValueIcon(value)" />
                        <v-tooltip
                            activator="parent"
                            location="top"
                            :text="Controller.getValueTip(value)"
                        />
                    </v-btn>
                </v-btn-toggle>
            </div>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Controller, type ControllerValues } from "@/models/Controls/Controller";

const props = defineProps<{
    /**
     * Controllers to handle
     */
    controllers: Controller<any>[];
}>();

const emits = defineEmits<
    /**
     * Emits a number as signal to update some other components in `SelectionComponent`.
     */
    (event: "update", update: number) => void
>();

const toggle = ref<ControllerValues[][]>(props.controllers.map((controller) => controller.state));

/**
 *
 * @param controller Controller to update values.
 * @param value Desired value.
 *
 * @emits update A simple number sand to update other components avec the value changing.
 */
const updateValue = (controller: Controller<any>, value: ControllerValues[]) => {
    controller.set(value);
    emits("update", 1);
};
</script>
