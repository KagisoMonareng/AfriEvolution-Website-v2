import { defineConfig } from "vite";

export default defineConfig({
  base: './', // Use relative paths for assets so dist folder works standalone
  root: ".",
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about-us.html',
        services: './services.html',
        approach: './approach.html',
        contact: './contact.html',
        privacy: './privacy.html',
        terms: './terms.html',
        stack: './stack.html',
        notfound: './404.html'
      }
    }
  },
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


