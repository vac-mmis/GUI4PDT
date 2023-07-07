import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

// Router
import router from "./router";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    faHome,
    faBars,
    faLocationCrosshairs,
    faEye,
    faCubes,
    faXmark,
    faWindowMinimize,
    faMinus,
    faPlus,
    faPlay,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
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

const pinia = createPinia();

library.add(
    faHome,
    faBars,
    faLocationCrosshairs,
    faEye,
    faCubes,
    faXmark,
    faWindowMinimize,
    faMinus,
    faPlus,
    faPlay,
    faPause
);

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount("#app");
