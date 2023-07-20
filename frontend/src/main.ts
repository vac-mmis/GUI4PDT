import { createApp } from "vue";
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
        aliases,
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
axios.defaults.baseURL = "http://localhost:3000/api";

// Pinia initialization
const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
