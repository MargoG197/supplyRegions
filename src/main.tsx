// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { RouterProvider } from 'react-router-dom';

import { router } from './routesConfig.tsx';
import { QueryProvider } from './app/providers';

import './index.css';

// Инициализация PWA
const updateSW = registerSW({
  onNeedRefresh() {
      updateSW(true);
  },
  immediate: true,
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Это заставит Service Worker проверить, нет ли новой версии на сервере
    updateSW(); 
  }
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>
);