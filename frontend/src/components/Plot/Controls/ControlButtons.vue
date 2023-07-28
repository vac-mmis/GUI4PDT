<template>
    <v-btn-toggle v-model="toggle" multiple rounded="xl" color="secondary">
        <v-btn
            v-for="command in commands"
            :key="`${command.name}-${command.state}`"
            :value="command.name"
            @click="command.set(toggle.includes(command.name))"
        >
            <v-icon :icon="command.icon" />
            <v-tooltip activator="parent" location="bottom">
                {{ command.tooltip }}
            </v-tooltip>
        </v-btn>
    </v-btn-toggle>
</template>

<script lang="ts" setup>
import { Command } from "@/components/Utils/Command";
import { ref, watch } from "vue";

const props = defineProps<{ commands: Command<boolean>[] }>();
const emits = defineEmits<(e: "update", update: number) => void>();

const toggle = ref(
    props.commands
        .filter((command) => {
            return command.state.value;
        })
        .map((command) => command.name)
);

watch(
    () => toggle.value,
    () => {
        emits("update", 1);
    }
);
</script>
