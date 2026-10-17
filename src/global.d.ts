/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Для обычных глобальных CSS (import './App.css')
declare module '*.css';

// Для CSS-модулей (если будете использовать)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Для SCSS (аналогично)
declare module '*.scss';
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Для SVG как React-компонентов
declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react';
  const Component: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default Component;
}