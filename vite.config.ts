import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Supply Regions',
        short_name: 'Supply',
        description: 'Управление поставками продуктовых наборов',
        theme_color: '#1677ff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~app': path.resolve(__dirname, './src/app'),
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