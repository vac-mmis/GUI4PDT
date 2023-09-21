/**
 * @module Router
 */
import { createRouter, createWebHistory } from "vue-router";
const ThreeView = () => import("@/views/PlotView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const FileView = () => import("@/views/FileHandlerView.vue");

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
        {
            path: "/file",
            name: "File Handler",
            component: FileView,
            meta: {
                icon: "fa fa-info",
            },
        },
        
    ],
});

export default router;
