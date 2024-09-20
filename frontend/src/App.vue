<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/MainComponents/NavBar.vue";
import { onMounted } from "vue";
import { PDTStore } from "@/store/pdt.store";
import { materialStore } from "@/store/material.store";
import { modelStore } from "@/store/model.store";

const pdt = PDTStore();
const material = materialStore();
const model = modelStore();

onMounted(async () => {
    pdt.initializeWebSocket();
    model.initializeWebSocket();
    material.initializeWebSocket();
});
</script>

<template>
    <header></header>
    <v-app app>
        <v-layout>
            <NavBar></NavBar>
            <v-main>
                <RouterView />
            </v-main>
        </v-layout>
    </v-app>
</template>
