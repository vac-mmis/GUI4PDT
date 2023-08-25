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
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

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
            fa,
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

createApp(App).use(VueDOMPurifyHTML).use(vuetify).use(pinia).use(router).mount("#app");

export * as Interfaces from "@/interfaces";
export * as Models from "@/models";
export * as Router from "@/router";
export * as Stores from "@/store";
export * as World from "@/World";
export * as Utils from "@/utils";
