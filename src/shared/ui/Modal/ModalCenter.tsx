import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChangeComment?: () => void;
  children: React.ReactNode;
}

export const ModalCenter: React.FC<IModalProps> = ({
  isOpen,
  onOpenChange,
  onOpenChangeComment,
  children,
}) => {
 const scrollPosition = useRef(0);
 const container = document.getElementById('modal-portal');
  useEffect(() => {
      if (isOpen) {
        // Сохраняем текущую позицию скролла
        scrollPosition.current = window.scrollY;
        
        // Блокируем скролл
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition.current}px`;
        document.body.style.width = '100%';
      } else {
        // Восстанавливаем скролл
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Возвращаем скролл на сохраненную позицию
        window.scrollTo(0, scrollPosition.current);
      }
  
      return () => {
        // Очистка при размонтировании
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      };
  }, [isOpen]);

  

  useEffect(() => {
    if (isOpen) {
      document.getElementById('body')?.classList.add('popup-open');
    } else {
      document.getElementById('body')?.classList.remove('popup-open');
    }

    return () => {
      document.getElementById('body')?.classList.remove('popup-open');
    };
  }, [isOpen]);

  if (!isOpen || !container) return null;

  const ModalCenterContent = (
    <div
      onClick={e => {
        e.stopPropagation();
        onOpenChange(false);
        if (onOpenChangeComment) {
          onOpenChangeComment();
        }
      }}
    >
      <div
        onClick={() => {
          onOpenChange(false);
         if (onOpenChangeComment) {
          onOpenChangeComment();
        }
        }}
      >
        <div className="fixed inset-0 bg-black opacity-60" />
        <div
          className="text-left fixed inset-0 flex pt-[50%] justify-center"
          onClick={() => onOpenChange(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(ModalCenterContent, container);
};