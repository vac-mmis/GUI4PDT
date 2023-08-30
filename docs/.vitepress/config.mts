import * as path from "path";
import fs, { readdirSync } from "fs";
import { defineConfig } from "vitepress";

import frontendSidebar from "../frontend/modules/typedoc-sidebar.json";
import backendSidebar from "../backend/typedoc-sidebar.json";

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
    title: "MMIS GUI for PDT",
    description: "Developper documentation",
    outDir: path.resolve(__dirname, "../dist"),
    base: "/",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Frontend", link: "/frontend/index" },
            { text: "Backend", link: "/backend/index" },
        ],
        sidebar: [
            {
                text: "Frontend",
                link: "/frontend/index",
                items: [
                    {
                        text: "Components",
                        collapsed: true,
                        items: getSideBar("docs", "docs/frontend/components"),
                    },
                    {
                        text: "Views",
                        collapsed: true,
                        items: getSideBar("docs", "docs/frontend/views"),
                    },
                    {
                        text: "Modules",
                        collapsed: true,
                        items: frontendSidebar,
                    },
                ],
            },
            {
                text: "Backend",
                link: "/backend/index",
                items: backendSidebar,
            },
        ],
        socialLinks: [
            {
                icon: "github",
                link: "https://git.informatik.uni-rostock.de/MMIS-OTC/230606_GUI4PDT-SB",
            },
        ],
    },
    rewrites: {
        "/doc/modules/(.*)": "/modules/(.*)",
    },
});
