/**
 * Main file for MMIS frontend application
 *
 * @module index
 */
import { createApp } from "vue";

// Sanitize module for HTML save injection
import VueDOMPurifyHTML from "vue-dompurify-html";

import App from "./App.vue";

// Pinia
import { createPinia } from "pinia";

// Axios
import axios from "axios";

// Router
import router from "./router";

// Vuetify
import "vuetify/styles";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from 'vuetify/iconsets/mdi'

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import Vector3 from "@/components/EditInputComponents/Vector3.vue";
import Vector2 from "@/components/EditInputComponents/Vector2.vue";
import Matrix3_3 from "@/components/EditInputComponents/Matrix3_3.vue";
import Combo from "@/components/EditInputComponents/Combo.vue";
import ComboWithValue from "@/components/EditInputComponents/ComboWithValue.vue";
import Number from "@/components/EditInputComponents/Number.vue";
import StringFormElement from "@/components/EditInputComponents/StringFormElement.vue";


const myCustomLightTheme = {
    dark: false,
    colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        primary: "#004a99",
        secondary: "#ffa100",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
    },
};

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "fa",
        aliases: {
            ...aliases,
            close: "fas fa-close",
            minimize: "fas fa-window-minimize",
            maximize: "fas fa-window-maximize",
        },
        sets: {
            fa,mdi
        },
    },
    theme: {
        defaultTheme: "myCustomLightTheme",
        themes: {
            myCustomLightTheme,
        },
    },
});

// Axios default baseURL
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL ?? "";

// Pinia initialization
const pinia = createPinia();

declare global {
    interface Window {
      OFFLINE_MODE: boolean;
    }
  }

// Define a global variable on the custom window object
window.OFFLINE_MODE = true;

createApp(App).use(VueDOMPurifyHTML).use(vuetify).use(pinia).use(router)
.component("Combo",Combo)
.component("ComboWithValue",ComboWithValue)
.component("Vector2",Vector2)
.component("Vector3",Vector3)
.component("Matrix3_3",Matrix3_3)
.component("Number",Number)
.component("StringFormElement",StringFormElement)

.mount("#app");

export * as Interfaces from "@/interfaces";
export * as Models from "@/models";
export * as Router from "@/router";
export * as Stores from "@/store";
export * as World from "@/World";
export * as Utils from "@/utils";
