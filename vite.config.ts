import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Дари еду регионы",
        short_name: "Дари еду регионы",
        description: "Управление поставками продуктовых наборов",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      // Настройки Workbox для офлайн-режима
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // 1. Для HTML (навигация): сначала сеть, при ошибке/таймауте - кеш
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              networkTimeoutSeconds: 3, // Ждем 3 секунды, потом берем кеш
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // 2. Для JS, CSS, шрифтов: сначала сеть, при ошибке - кеш
            urlPattern: /\.(?:js|css|woff2?)$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "static-assets",
              networkTimeoutSeconds: 3,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
      "~app": path.resolve(__dirname, "./src/app"),
      "~assets": path.resolve(__dirname, "./src/assets"),
      "~pages": path.resolve(__dirname, "./src/pages"),
      "~widgets": path.resolve(__dirname, "./src/widgets"),
      "~features": path.resolve(__dirname, "./src/features"),
      "~entities": path.resolve(__dirname, "./src/entities"),
      "~shared": path.resolve(__dirname, "./src/shared"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
