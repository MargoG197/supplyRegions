import { useEffect, useState } from "react";
import { ModalTop } from "./Modal/ModalTop";

interface SuccessPopupProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  onOk?: () => void;
  onWriteOff?: () => void;
  shouldAutoClose?: boolean;
  autoCloseDelay?: number
}

export const SuccessPopup = ({
  isOpen,
  onOpenChange,
  title,
  onOk,
  onWriteOff,
  shouldAutoClose = false,
  autoCloseDelay = 2500,
}: SuccessPopupProps) => {
  // Локальный стейт, чтобы запустить анимацию галочки только после открытия окна
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    if (isOpen) {
      // Небольшая задержка, чтобы окно успело появиться
      const timer = setTimeout(() => setShouldAnimate(true), 300);
      return () => clearTimeout(timer);
    } else {
      // Оборачиваем setState в setTimeout, чтобы убрать синхронный вызов
      const timer = setTimeout(() => setShouldAnimate(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

 useEffect(() => {
    if (isOpen && shouldAutoClose) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onOpenChange, shouldAutoClose]);

  // Проверяем, есть ли хоть одна кнопка
  const hasButtons = Boolean(onOk || onWriteOff);

  return (
    <ModalTop isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="w-full max-w-125 bg-light-gray-white dark:bg-light-gray-7-logo flex flex-col justify-between h-screen self-center mx-auto">
        {/* Верхняя часть с контентом */}
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-8">
          {/* Заголовок */}
          {title && (
            <h2 className="font-heading-h3 text-light-gray-black dark:text-light-gray-white text-center">
              {title}
            </h2>
          )}
          {/* Зеленый квадрат с галочкой */}
          <div
            className="w-[200px] h-[200px] bg-[#1D8A56] rounded-[50px] flex items-center justify-center shadow-lg"
            style={{
              animation: isOpen
                ? "pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"
                : "none",
            }}
          >
            {/* SVG галочка. Обратите внимание на strokeDasharray и strokeDashoffset */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 50 L45 75 L85 25"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="100"
                strokeDashoffset={shouldAnimate ? 0 : 100}
                style={{
                  transition: "stroke-dashoffset 0.6s ease-in-out 0.2s", // Задержка 0.2с, чтобы квадрат чуть появился
                }}
              />
            </svg>
          </div>
        </div>

        {/* Нижняя часть с кнопками */}
         {hasButtons && (
          <div className="flex px-4 justify-center gap-4 pb-6">
            {onOk && (
              <button
                onClick={onOk}
                className="btn-M-WhiteDefault"
              >
                Ок
              </button>
            )}
            {onWriteOff && (
              <button
                onClick={onWriteOff}
                className="btn-M-RedDefault"
              >
                Есть списание
              </button>
            )}
          </div>
        )}
      </div>
    </ModalTop>
  );
};
