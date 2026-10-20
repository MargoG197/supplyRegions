//2.
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const ModalTop = ({ isOpen, onOpenChange, children }: IModalProps) => {
  const container = document.getElementById('modal-portal');
  const [shouldRender, setShouldRender] = useState(isOpen);

  const CONTENT_DURATION = 350;
  const OVERLAY_DURATION = 150;

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
          style={{
            animation: isOpen
              ? `slide-in-right ${CONTENT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
              : `slide-out-right ${CONTENT_DURATION}ms ease-in forwards`,
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    container
  );
};