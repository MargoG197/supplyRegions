import { useState } from "react";
import classNames from "classnames";
import NotificationIcon from "~assets/icons/notify_bell.svg?react";
import { Profile } from "../Profile/Profile";

// Тип состояния для разрешений
type NotificationPermissionState =
  | "default"
  | "granted"
  | "denied"
  | "unsupported";

export const Header = () => {
  // В будущем эти данные будут браться из Zustand (authStore)
  const orgName = "НКО «Добрые Сердца»";
  const userRole = "Куратор";
  const userCity = "Самара";

  // Состояние для отслеживания статуса уведомлений
  const [permission, setPermission] = useState<NotificationPermissionState>(
    () => {
      if (!("Notification" in window)) return "unsupported";
      return Notification.permission as NotificationPermissionState;
    },
  );

  // Обработчик клика по иконке
  const handleNotificationClick = async () => {
    // 1. Проверка поддержки браузером
    if (!("Notification" in window)) {
      alert("Ваш браузер не поддерживает push-уведомления");
      return;
    }

    // 2. Если уже разрешено — просто показываем тестовое уведомление (или открываем список)
    if (Notification.permission === "granted") {
      new Notification("Уведомления уже включены", {
        body: "Вы будете получать важные оповещения.",
        icon: "/icon-192x192.png", // Путь к иконке вашего PWA
      });
      return;
    }

    // 3. Если запрещено — объясняем, как включить вручную
    if (Notification.permission === "denied") {
      const result = await Notification.requestPermission();
      if (result === "granted") {
        alert("Разрешение получено. Можно подписываться на Push.");

        new Notification("Уведомления включены!", {
          body: "Теперь вы не пропустите важные события.",
          icon: "/icon-192x192.png",
        });
      } else {
        alert(
          "Уведомления заблокированы. Пожалуйста, разрешите их в настройках браузера для этого сайта.",
        );
      }

      return;
    }

    // 4. Запрашиваем разрешение (статус 'default')
    try {
      const result = await Notification.requestPermission();
      setPermission(result as NotificationPermissionState);

      if (result === "granted") {
        // Здесь в будущем будет вызов функции подписки на Push (pushManager.subscribe)
        alert("Разрешение получено. Можно подписываться на Push.");

        // Показываем приветственное уведомление
        new Notification("Уведомления включены!", {
          body: "Теперь вы не пропустите важные события.",
          icon: "/icon-192x192.png",
        });
      }
    } catch (error) {
      console.error("Ошибка при запросе разрешения:", error);
    }
  };

  // Определяем, показывать ли зелёную точку
  // Логика: показываем, если разрешение ещё не получено (default) или если это ваша бизнес-логика непрочитанных
  const showDot = permission === "default" || permission === "unsupported";

  return (
    <div className="relative w-full max-w-125 p-4 pt-2.5 bg-light-gray-white dark:bg-light-gray-7-logo flex items-start justify-between overflow-x-hidden">
      {/* Левая часть: Название и подзаголовок */}
      <div className="flex flex-col justify-start items-start">
        <h1 className="font-bodytext-regular text-light-gray-black dark:text-light-gray-1 leading-tight">
          {orgName}
        </h1>
        <p className="font-caption-regular text-light-gray-5 dark:text-light-gray-4 mt-0.5">
          {userRole} <span className="ml-1">{userCity}</span>
        </p>
      </div>

      {/* Правая часть: Уведомления и Аватар */}
      <div className="w-23 flex items-center justify-between gap-3.5">
        {/* Иконка уведомлений (теперь это кнопка) */}
        <button
          type="button"
          onClick={handleNotificationClick}
          aria-label="Включить уведомления"
          className={classNames(
            "rounded-full bg-light-gray-1 dark:bg-light-gray-6 w-10 h-10 min-w-10 min-h-10",
            "flex items-center justify-center relative cursor-pointer",
            "transition-colors hover:bg-light-gray-2 dark:hover:bg-light-gray-5",
            "outline-none focus-visible:ring-2 focus-visible:ring-light-brand-green",
          )}
        >
          <NotificationIcon className="fill-light-gray-7-logo dark:fill-light-gray-1" />

          {/* Зеленая точка (показываем, если уведомления ещё не включены) */}
          {showDot && (
            <div className="bg-light-brand-green w-1.5 h-1.5 min-w-1.5 min-h-1.5 rounded-full top-8.5 left-8.5 absolute pulse" />
          )}
        </button>

        <Profile />
      </div>
    </div>
  );
};
