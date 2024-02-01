/// <reference types="vitest" />
/// <reference types="vite/client" />

import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import { configDefaults } from "vitest/config";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [vue(), vueJsx()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: process.env.VITE_API_BASE_URL,
                    changeOrigin: true,
                },
            },
        },
        test: {
            environment: "jsdom",
            exclude: [...configDefaults.exclude, "e2e/*"],
            root: fileURLToPath(new URL("./", import.meta.url)),
        },

        base: env.VITE_BASE_PATH
    }
});
