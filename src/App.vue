<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/MainComponents/NavBar.vue";
</script>

<template>
    <header></header>
    <v-layout>
        <NavBar></NavBar>
        <v-main>
            <RouterView />
        </v-main>
    </v-layout>
</template>
s
