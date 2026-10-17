import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Дари еду регионы',
        short_name: 'Дари еду регионы',
        description: 'Управление поставками продуктовых наборов',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
         icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // Настройки Workbox для офлайн-режима
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html', 
        navigateFallbackDenylist: [/^\/api/], 
        runtimeCaching: [
          {
            // Кеширование API-запросов
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 часа
              },
              networkTimeoutSeconds: 10,
            },
          },
          {

            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 дней
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~app': path.resolve(__dirname, './src/app'),
      '~assets': path.resolve(__dirname, './src/assets'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~widgets': path.resolve(__dirname, './src/widgets'),
      '~features': path.resolve(__dirname, './src/features'),
      '~entities': path.resolve(__dirname, './src/entities'),
      '~shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});