import { createRouter, createWebHistory } from "vue-router";
import ThreeView from "../views/PlotView.vue";
import AboutView from "../views/AboutView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Plot Test",
            component: ThreeView,
            meta: {
                icon: "fa fa-chart-scatter",
            },
        },
        {
            path: "/about",
            name: "About page",
            component: AboutView,
            meta: {
                icon: "fa fa-info",
            },
        },
    ],
});

export default router;
