import { useEffect, useState } from "react";
import { ModalTop } from "./Modal/ModalTop";

interface SuccessPopupProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  onOk?: () => void;
  onWriteOff?: () => void;
  shouldAutoClose?: boolean;
  autoCloseDelay?: number;
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
    <ModalTop isOpen={isOpen} onOpenChange={onOpenChange} animation="scale">
      <div className="w-full max-w-125 bg-light-gray-white dark:bg-light-gray-7-logo flex flex-col gap-53.5 h-screen self-center mx-auto">
        {/* Верхняя часть с контентом */}
        <div className="w-full flex flex-col items-center pt-35.5 gap-8">
          {/* Заголовок */}
          {title && (
            <h2 className="font-headline-h2 text-light-gray-5 dark:text-light-gray-white text-center">
              {title}
            </h2>
          )}
          {/* Зеленый квадрат с галочкой */}
          <div
            className="w-[213.33px] h-[213.33px] bg-[#1D8A56] rounded-[54px] flex items-center justify-center shadow-lg"
            style={{
              animation: isOpen
                ? "pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"
                : "none",
            }}
          >
            {/* SVG галочка. Обратите внимание на strokeDasharray и strokeDashoffset */}
            <svg
              width="214"
              height="214"
              viewBox="0 0 214 214"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Зелёный квадрат без вырезанной галочки */}
              <rect
                width="213.333"
                height="213.333"
                rx="54"
                fill="#1F7B4E"
              />

              {/* Stroke-галочка, повторяющая внутренний контур оригинала */}
              <path
                d="M63 110 L95 140 L151 76"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="160"
                strokeDashoffset={shouldAnimate ? 0 : 160}
                style={{
                  transition: "stroke-dashoffset 0.6s ease-in-out 0.2s",
                }}
              />
            </svg>
          </div>
        </div>

        {/* Нижняя часть с кнопками */}
        {hasButtons && (
          <div className="flex w-full justify-center gap-2">
            {onOk && (
              <button onClick={onOk} className="btn-M-WhiteDefault-w">
                Ок
              </button>
            )}
            {onWriteOff && (
              <button onClick={onWriteOff} className="btn-M-RedDefault-w">
                Есть списание
              </button>
            )}
          </div>
        )}
      </div>
    </ModalTop>
  );
};
