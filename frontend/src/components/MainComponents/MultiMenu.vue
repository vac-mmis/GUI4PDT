<template>
    <v-btn
        v-for="(item, index) in menu"
        :key="index"
        :value="index"
        :prepend-icon="item.icon"
        :to="item.route"
        >{{ item.title }}
        <v-menu activator="parent">
            <v-list v-if="item.subMenus.length > 0">
                <v-list-item
                    density="compact"
                    v-for="(subItem, subIndex) in item.subMenus"
                    :key="subIndex"
                    :value="subIndex"
                    :to="subItem.route"
                >
                    <div class="d-flex justify-space-between">
                        <v-list-item-title>{{ subItem.title }}</v-list-item-title>

                        <v-icon
                            class="float-end ml-8"
                            v-if="subItem.subMenus.length > 0"
                            icon="fas fa-chevron-right"
                        ></v-icon>
                        <v-icon class="float-end" v-else></v-icon>
                    </div>

                    <v-menu
                        v-if="subItem.subMenus.length > 0"
                        activator="parent"
                        location="end"
                        open-on-hover
                        open-on-click
                        ><v-list>
                            <v-list-item
                                v-for="(subSubItem, subSubIndex) in subItem.subMenus"
                                :key="subSubIndex"
                                :value="subSubIndex"
                                :to="subSubItem.route"
                            >
                                <v-list-item-title>{{ subSubItem.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-btn>
</template>

<script lang="ts" setup>
import { CustomMenu } from "@/models/CustomMenu";
const staticMode = import.meta.env.VITE_STATIC_MODE === "true";

/**
 * Menu structure with depth 3
 */

let menu: CustomMenu[] = [];

if (!staticMode) {
    menu = [
        new CustomMenu("File", "fas fa-file", "", [
            new CustomMenu("New", "fas fa-plus", "", [
                new CustomMenu("From Import", "fas fa-file-import", "/import"),
                new CustomMenu("From Empty", "fas fa-file-import", "/empty"),
            ]),
            new CustomMenu("Add CSV", "fas fa-wand-magic-sparkles", "/csv"),
            new CustomMenu("Open", "fas fa-file-import", "/open", []),
        ]),
        new CustomMenu("Plot", "fas fa-mountain-sun", "/plot"),
        new CustomMenu("About", "$info", "/about"),
    ];
} else {
    menu = [
        new CustomMenu("File", "fas fa-file", "", [
            new CustomMenu("Open", "fas fa-file-import", "/open", []),
        ]),
        new CustomMenu("Plot", "fas fa-mountain-sun", "/plot"),
        new CustomMenu("About", "$info", "/about"),
    ];
}
</script>
