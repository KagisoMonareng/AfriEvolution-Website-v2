import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  appType: "mpa",
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: "/index.html",
    cors: true,
    hmr: {
      clientPort: 443,
      protocol: "wss"
    }
  },
  preview: {
    port: 4173,
    open: "/index.html"
  }
});


