/**
 * @module Router
 */
import { createRouter, createWebHistory } from "vue-router";
const ThreeView = () => import("@/views/PlotView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const OpenView = () => import("@/views/OpenView.vue")
const Startup = () => import("@/views/StartHandler.vue")

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:pathMatch(.*)",
            redirect: "/" 
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
        // {
        //     path: "/import",
        //     name: "Import Project",
        //     component: ImportView,
        //     meta: {
        //         icon: "fa fa-info",
        //     },
        // },
        {
            path: "/plot",
            name: "See Plot",
            component: ThreeView,
            meta: {
                icon: "fa fa-info",
            },
        },

        {
            path: "/",
            name: "start",
            component: Startup,
            meta: {
                icon: "fa fa-info",
            },
        },
        // {
        //     path: "/csv",
        //     name: "Add CSV",
        //     component: CSVView,
        //     meta: {
        //         icon: "fa fa-info",
        //     },
        // },
        // {
        //     path: "/empty",
        //     name: "New from Empty",
        //     component: NewFromEmptyView,
        //     meta: {
        //         icon: "fa fa-info",
        //     },
        // },
       
        
    ],
});


//Router Navigation Guard to prevent from reloading errors

router.beforeEach((to, from, next) => {
    // Check if it's a page refresh
    const isPageRefresh = !from.name;

   

    // Check if the target route is not the current route to avoid infinite redirection
    if (isPageRefresh && to.path == "/plot") {
        next("/");
        //next({ name: "Open Project" });
    } else {
        // Continue with the regular navigation
        next();
    }
});

export default router;
