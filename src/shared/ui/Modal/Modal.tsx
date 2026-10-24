import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

type ModalAnimation = 'scale' | 'slide-right' | 'fade' | 'slide-up' | 'slide-down';
type ModalPosition = 'center' | 'top' | 'bottom';

interface IModalProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  animation?: ModalAnimation;
  /** Позиция модального окна (по умолчанию center) */
  position?: ModalPosition;
  /** Блокировать ли скролл страницы (по умолчанию true) */
  lockScroll?: boolean;
  /** Дополнительные классы для обертки контента */
  className?: string;
}

export const Modal = ({ 
  isOpen, 
  onOpenChange, 
  children, 
  animation = 'slide-right',
  position = 'top',
  lockScroll = true,
  className
}: IModalProps) => {
  const container = document.getElementById('modal-portal');
  const [shouldRender, setShouldRender] = useState(isOpen);

  const CONTENT_DURATION = 350;
  const OVERLAY_DURATION = 150;

  // Твои анимации + добавил для bottom/top
  const animations: Record<ModalAnimation, { in: string; out: string }> = {
    scale: {
      in: `scale-up ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      out: `scale-down ${CONTENT_DURATION}ms ease-in forwards`,
    },
    'slide-right': {
      in: `slide-in-right ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      out: `slide-out-right ${CONTENT_DURATION}ms ease-in forwards`,
    },
    'slide-up': {
      in: `slide-in-up ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      out: `slide-out-down ${CONTENT_DURATION}ms ease-in forwards`,
    },
    'slide-down': {
      in: `slide-in-down ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      out: `slide-out-up ${CONTENT_DURATION}ms ease-in forwards`,
    },
    fade: {
      in: `fade-in ${CONTENT_DURATION}ms ease-out forwards`,
      out: `fade-out ${CONTENT_DURATION}ms ease-in forwards`,
    },
  };

  // Логика твоего shouldRender
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShouldRender(true), 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShouldRender(false), CONTENT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Опциональная блокировка скролла (из второй модалки)
  useEffect(() => {
    if (!lockScroll) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, lockScroll]);

  const handleOverlayClick = () => onOpenChange(false);
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  if (!shouldRender || !container) return null;
  
  // Выбираем анимацию (если передали slide-up для bottom — отлично)
  const currentAnimation = animations[animation];

  // Классы для позиционирования
  const positionClasses: Record<ModalPosition, string> = {
    center: 'items-center justify-center p-4',
    top: 'items-start justify-center',
    bottom: 'items-end justify-center',
  };

  return createPortal(
    <div className="fixed inset-0" onClick={handleOverlayClick}>
      
      {/* Фон (Оверлей) */}
      <div
        className="fixed inset-0 bg-black opacity-60"
        style={{
          animation: isOpen
            ? `fade-in ${CONTENT_DURATION}ms ease-out forwards`
            : `fade-out-fast ${OVERLAY_DURATION}ms ease-in forwards`,
        }}
      />
      
      {/* Контейнер для позиционирования */}
      <div
        className={classNames(
          "absolute inset-0 flex w-full h-full overflow-y-auto",
          positionClasses[position]
        )}
        onClick={handleModalClick}
      >
        {/* Обертка для анимации контента */}
        <div
          // Если position === 'bottom' или 'top', лучше чтобы ширина была 100%
          className={classNames(
            "w-full max-h-full overflow-y-auto",
            position === 'center' && "h-auto",
            className
          )}
          style={{ animation: isOpen ? currentAnimation.in : currentAnimation.out }}
        >
          {children}
        </div>
      </div>
    </div>,
    container
  );
};