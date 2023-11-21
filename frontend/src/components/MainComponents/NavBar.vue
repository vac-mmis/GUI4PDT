<template>
    <v-app-bar color="primary" dark collapse-on-scroll>
        <v-app-bar-nav-icon icon="fas fa-home" @click="toggleDrawer"> </v-app-bar-nav-icon>
        <v-toolbar-title>OTC-DaTA GUI</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer color="primary" temporary dark v-model="drawer" elevation="1">
        <v-list>
            <v-list-item
                v-for="item of menuItems"
                :key="item.title"
                :to="item.route"
                link
                :prepend-icon="item.icon"
                :title="item.title"
            >
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let drawer = ref(false);
//test
const toggleDrawer = () => {
    drawer.value = !drawer.value;
};

/**
 * Add a item in the menu drawer here
 */
const menuItems = [
    { title: "Plot", icon: "fas fa-cube", route: "/" },
    { title: "About", icon: "$info", route: "/about" },
];
</script>
