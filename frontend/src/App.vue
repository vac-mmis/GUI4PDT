<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/MainComponents/NavBar.vue";
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
