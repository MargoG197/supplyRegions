// src/paths.ts

export const PATHS = {
  // Корень
  ROOT: "/",

  // Регистрация
  REGISTRATION: "/registration",

  // Куратор
  CURATOR: {
    ROOT: "/curator",
    MAIN: "/curator/main",
  },
  PROFILE: "/profile",
  // Отчеты
  REPORTS: {
    ROOT: "/reports",
    WITHDRAWAL: "/reports/withdrawal",
    WRITE_OFF: "/reports/write-off",
    // ISSUANCE: "/reports/issuance", // Раскомментируете, когда добавите
  },

  // Заявки
  REQUESTS: "/request",

  // QR
  QR: "/qr",

  // База знаний (Knowledge Base)
  KNOWLEDGE_BASE: "/knowledge-base",

  // Страница 404 (или редирект)
  NOT_FOUND: "*",
} as const;
