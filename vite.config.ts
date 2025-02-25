import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: { port: 5525, strictPort: true, open: true },
  preview: { port: 5510, strictPort: true, open: true },
});
