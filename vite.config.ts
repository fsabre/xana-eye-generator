import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    // Config for GitHub Pages
    base: "/xana-eye-generator/",
    build: {outDir: "docs"},
    plugins: [react()],
})
