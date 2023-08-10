<template>
    <v-sheet class="d-flex ma-2 flex-column">
        <span class="pr-2"><slot /></span>
        <div
            class="d-flex flex-row justify-space-between align-center"
            v-for="(command, i) in commands"
            :key="`${command.name}-${command.state}`"
        >
            <span>
                <v-icon size="small" variant="text" :icon="command.icon" />
                <span class="px-2">{{ command.tooltip }}</span>
            </span>
            <v-btn-toggle
                v-model="toggle[i]"
                color="secondary"
                inline
                mandatory
                @update:model-value="command.set(toggle[i])"
            >
                <v-btn :value="false" size="small" icon="fas fa-eye-slash"> </v-btn>
                <v-btn :value="true" size="small" icon="fas fa-eye"> </v-btn>
                <v-btn :value="true" size="small" icon="fas fa-wave-square" disabled> </v-btn>
            </v-btn-toggle>
        </div>
    </v-sheet>
</template>

<script lang="ts" setup>
import { Command } from "@/components/Utils/Command";
import { ref, watch } from "vue";

const props = defineProps<{ commands: Command<boolean>[] }>();
const emits = defineEmits<(e: "update", update: number) => void>();

const toggle = ref<boolean[]>(props.commands.map((command) => !!command.state.value));

watch(
    () => toggle.value,
    () => {
        emits("update", 1);
    },
    { deep: true }
);
</script>
