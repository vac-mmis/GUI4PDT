/**
 * @module Router
 */
import { createRouter, createWebHistory } from "vue-router";
const ThreeView = () => import("@/views/PlotView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const ImportView = () => import("@/views/FileHandlerView.vue");
const OpenView = () => import("@/views/OpenView.vue")

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
            path: "/import",
            name: "Import Project",
            component: ImportView,
            meta: {
                icon: "fa fa-info",
            },
        },
        {
            path: "/open",
            name: "Open Project",
            component: OpenView,
            meta: {
                icon: "fa fa-info",
            },
        },
       
        
    ],
});

export default router;
