<template>
    <v-app-bar color="primary" dark collapse-on-scroll>
        <v-row align-md="center" justify="space-between" class="mx-10">
            <v-col cols="auto">
                <v-app-bar-title> OTC-DaTA GUI</v-app-bar-title>
            </v-col>

            <v-col cols="auto" class="me-auto mx-10">
                <MultiMenu></MultiMenu>
            </v-col>

            <v-col cols="auto"> </v-col>

            <v-col cols="auto">
                <v-row>
                    <v-col>
                        <v-label v-if="staticMode" class="text-h5" color="white">
                            {{ "static mode" }}
                        </v-label>
                        <v-label v-else class="text-h5" color="white">
                            {{ "live mode" }}
                        </v-label>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script lang="ts" setup>
import MultiMenu from "@/components/MainComponents/MultiMenu.vue";

import { ref } from "vue";

const staticMode = ref<boolean>(import.meta.env.VITE_STATIC_MODE === "true");
</script>

<style></style>
