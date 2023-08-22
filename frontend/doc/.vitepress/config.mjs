import * as path from "path";
import fs, { readdirSync } from "fs";
import { defineConfig } from "vitepress";

import typedocSidebar from "../modules/typedoc-sidebar.json";

const getSideBar = (root, dir, ignorePath = []) => {
    const components = readdirSync(dir).filter((fileName) => !ignorePath.includes(fileName));
    if (components.length <= 0) {
        return {};
    } else {
        return components.map((fileName) => {
            const file = path.resolve(dir, fileName);
            if (fs.statSync(file).isDirectory()) {
                return {
                    text: fileName.charAt(0).toUpperCase() + fileName.slice(1),
                    items: getSideBar(root, file),
                };
            } else {
                return {
                    text: fileName.replace(/\.md$/, ""),
                    link: path.relative(root, file).replace(/\.md$/, ""),
                };
            }
        });
    }
};

export default defineConfig({
    outDir: path.resolve(__dirname, "../dist"),
    name: "MMIS GUI PDT Visualizer Documentation",
    base: "/",
    themeConfig: {
        sidebar: [
            {
                text: "Components",
                items: getSideBar("doc", "doc/components"),
            },
            {
                text: "Views",
                items: getSideBar("doc", "doc/views"),
            },
            {
                text: "Modules",
                items: typedocSidebar,
            },
        ],
    },
    rewrites: {
        "/doc/modules/(.*)": "/modules/(.*)",
    },
});
