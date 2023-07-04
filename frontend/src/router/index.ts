import { createRouter, createWebHistory } from "vue-router";
import ThreeView from "../views/PlotView.vue";
import AboutView from "../views/AboutView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Plot Test",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: ThreeView,
            meta: {
                icon: "fa fa-chart-scatter",
            },
        },
        {
            path: "/about",
            name: "About page",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: AboutView,
            meta: {
                icon: "fa fa-info",
            },
        },
    ],
});

export default router;
