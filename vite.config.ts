import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: { port: 5525, strictPort: true, open: true },
  preview: { port: 5510, strictPort: true, open: true },
});
