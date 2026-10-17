// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { RouterProvider } from 'react-router-dom';

import { router } from './routesConfig.tsx';
import { QueryProvider } from './app/providers';
import { ScannerProvider } from './app/providers/ScannerProvider';

import './index.css';

// Инициализация PWA
registerSW({
  onNeedRefresh() {
    if (confirm('Доступно обновление. Перезагрузить?')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log('✅ Приложение готово к работе офлайн');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <ScannerProvider />
    </QueryProvider>
  </StrictMode>
);