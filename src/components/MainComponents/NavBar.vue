<template>
    <v-app-bar color="primary" dark collapse-on-scroll>
        <v-app-bar-nav-icon @click="toggleDrawer"><v-icon icon="fa fa-home"></v-icon></v-app-bar-nav-icon>
        <v-toolbar-title>OTC-DaTA GUI</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer color="primary" temporary dark v-model="drawer">
        <v-list>
            <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route" link :prepend-icon="item.icon"
                :title="item.title">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

let drawer = ref(false);

const toggleDrawer = () => {
    drawer.value = !drawer.value;
};

const menuItems = [
    { title: 'Plot', icon: 'fa fa-chart-network', route: '/' },
    { title: 'About', icon: 'fa fa-circle-info', route: '/about' },
];
</script>
  