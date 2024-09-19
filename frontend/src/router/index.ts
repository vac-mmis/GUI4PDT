/**
 * @module Router
 */
import { createRouter, createWebHistory } from "vue-router";
const ThreeView = () => import("@/views/PlotView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const OpenView = () => import("@/views/OpenView.vue");
const NewFromEmptyView = () => import("@/views/NewFromEmptyView.vue");
const CSVView = () => import("@/views/CSVView.vue");
const FileHandlerView = () => import("@/views/FileHandlerView.vue");

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:pathMatch(.*)",
            redirect: "/",
        },

        {
            path: "/",
            redirect: "/plot",
        },

        {
            path: "/open",
            name: "Open Project",
            component: OpenView,
            meta: {
                icon: "fa fa-info",
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
            component: FileHandlerView,
            meta: {
                icon: "fa fa-info",
            },
        },
        {
            path: "/plot",
            name: "See Plot",
            component: ThreeView,
            meta: {
                icon: "fa fa-info",
            },
        },

        {
            path: "/csv",
            name: "Add CSV",
            component: CSVView,
            meta: {
                icon: "fa fa-info",
            },
        },
        {
            path: "/empty",
            name: "New from Empty",
            component: NewFromEmptyView,
            meta: {
                icon: "fa fa-info",
            },
        },
    ],
});

export default router;
