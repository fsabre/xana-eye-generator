import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    // Config for GitHub Pages
    base: "/xana-eye-generator/",
    build: {outDir: "docs"},
    plugins: [react()],
    define: {
        "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
    },
});
