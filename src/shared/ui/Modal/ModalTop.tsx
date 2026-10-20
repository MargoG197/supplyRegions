//2.
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalAnimation = 'scale' | 'slide-right' | 'fade';

interface IModalProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  animation?: ModalAnimation;
}

export const ModalTop = ({ isOpen, onOpenChange, children, animation = 'slide-right' }: IModalProps) => {
  const container = document.getElementById('modal-portal');
  const [shouldRender, setShouldRender] = useState(isOpen);

  const CONTENT_DURATION = 350;
  const OVERLAY_DURATION = 150;

    const animations: Record<ModalAnimation, { in: string; out: string }> = {
    scale: {
      in: `scale-up ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      out: `scale-down ${CONTENT_DURATION}ms ease-in forwards`,
    },
    'slide-right': {
      in: `slide-in-right ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      out: `slide-out-right ${CONTENT_DURATION}ms ease-in forwards`,
    },
    fade: {
      in: `fade-in ${CONTENT_DURATION}ms ease-out forwards`,
      out: `fade-out ${CONTENT_DURATION}ms ease-in forwards`,
    },
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShouldRender(true), 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShouldRender(false), CONTENT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = () => onOpenChange(false);
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  if (!shouldRender || !container) return null;
  const currentAnimation = animations[animation];
  
  return createPortal(
    <div className="fixed inset-0" onClick={handleOverlayClick}>
      
      {/* Фон */}
      <div
        className="fixed inset-0 bg-black opacity-60"
        style={{
          animation: isOpen
            ? `fade-in ${CONTENT_DURATION}ms ease-out forwards`
            : `fade-out-fast ${OVERLAY_DURATION}ms ease-in forwards`,
        }}
      />
      <div
       className="flex items-center justify-center"
        onClick={handleModalClick}
      >
        {/* Обертка для выезда справа */}
        <div
          className="h-full w-full"
          style={{ animation: isOpen ? currentAnimation.in : currentAnimation.out }}
          // style={{
          //   animation: isOpen
          //     ? `scale-up ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
          //     : `scale-down ${CONTENT_DURATION}ms ease-in forwards`,
          // }}
        >
          {children}
        </div>
      </div>
    </div>,
    container
  );
};