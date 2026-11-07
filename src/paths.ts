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
    DISTRIBUTION: "/reports/distribution",
    DISTRIBUTION_REPORT: "/reports/distribution-report",
    INFO_LETTER_REPORT: "/reports/info-letter-report",
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
