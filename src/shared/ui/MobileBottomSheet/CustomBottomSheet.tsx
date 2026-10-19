import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface CustomBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  closeOnClickOutside?: boolean;
  swipeToClose?: boolean;
  swipeThreshold?: number;
}


export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  header,
  closeOnClickOutside = true,
  swipeToClose = true,
  swipeThreshold = 100,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const container = document.getElementById('modal-portal');



 
  // Анимация открытия/закрытия
useEffect(() => {
  if (animationTimeoutRef.current) {
    clearTimeout(animationTimeoutRef.current);
  }

  if (isOpen) {
    animationTimeoutRef.current = setTimeout(() => {
      setShouldRender(true);
      setTranslateY(window.innerHeight);
      setOpacity(0);

      setTimeout(() => {
        setTranslateY(0);
        setOpacity(1);
      }, 10);
    }, 0);

  } else {
    // Оборачиваем setTranslateY в setTimeout, чтобы убрать синхронный вызов
    animationTimeoutRef.current = setTimeout(() => {
      setTranslateY(window.innerHeight); // Уезжаем вниз
      
      // Ждем 300мс, чтобы анимация закрытия завершилась, и удаляем из DOM
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }, 0);
  }

  return () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };
}, [isOpen]);

  // Функция проверки, можно ли начинать свайп
  const canStartSwipe = useCallback((target: HTMLElement): boolean => {
    // Запрещаем на интерактивных элементах
    if (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')) {
      return false;
    }

    // Запрещаем на элементах с data-no-swipe
    if (target.closest('[data-no-swipe="true"]')) {
      return false;
    }
    
    return true;
  }, []);

  // Закрытие с анимацией
  const handleClose = useCallback(() => {
    setTranslateY(window.innerHeight);
    setOpacity(0);
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    animationTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  // Touch события для свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeToClose) return;
    
    const target = e.target as HTMLElement;
    
    if (contentRef.current?.contains(target)) {
      const content = contentRef.current;
      if (content.scrollTop > 0) {
        return;
      }
    }
    
    if (!canStartSwipe(target)) {
      return;
    }
     const touch = e.touches[0];
  if (!touch) return;
    
    setStartY(touch.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !swipeToClose) return;
    const touch = e.touches[0];
  if (!touch) return;
    const deltaY = touch.clientY - startY;
    
    if (deltaY > 0) {
      const resistance = deltaY > 150 ? 0.5 : 0.9;
      const newTranslateY = deltaY * resistance;
      setTranslateY(newTranslateY);
      setOpacity(Math.max(0, 1 - deltaY / 500));
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || !swipeToClose) return;
    setIsDragging(false);
    
    if (translateY > swipeThreshold) {
      handleClose();
    } else {
      setTranslateY(0);
      setOpacity(1);
    }
  };

  // Mouse события для десктопа
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!swipeToClose || e.button !== 0) return;
    
    const target = e.target as HTMLElement;
    
    if (contentRef.current?.contains(target)) {
      const content = contentRef.current;
      if (content.scrollTop > 0) {
        return;
      }
    }
    
    if (!canStartSwipe(target)) {
      return;
    }
    
    setStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !swipeToClose) return;
    
    const deltaY = e.clientY - startY;
    
    if (deltaY > 0) {
      const resistance = deltaY > 150 ? 0.5 : 0.9;
      const newTranslateY = deltaY * resistance;
      setTranslateY(newTranslateY);
      setOpacity(Math.max(0, 1 - deltaY / 500));
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || !swipeToClose) return;
    setIsDragging(false);
    
    if (translateY > swipeThreshold) {
      handleClose();
    } else {
      setTranslateY(0);
      setOpacity(1);
    }
  };

  // Клик по оверлею
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      handleClose();
    }
  };

   if (!shouldRender || !container || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 w-full flex items-end justify-center" 
      style={{
        opacity: opacity,
        transition: isDragging ? 'none' : 'opacity 0.3s ease-out',
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        touchAction: 'none',
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleOverlayClick(e);
      }}
      // onTouchStart={(e) => e.stopPropagation()}
      // onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className="w-full max-w-125 bg-white dark:bg-light-gray-7-logo rounded-t-2xl"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          willChange: 'transform',
          touchAction: 'none', 
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >

        <div className="flex justify-center py-2">
          <div className="w-9 h-1 rounded-full bg-light-gray-2 dark:bg-light-gray-4" />
        </div>

        {header && <div className="px-4 pb-2">{header}</div>}

        <div
          onClick={(e) => e.stopPropagation()}
          onScroll={(e)=> e.stopPropagation()}
          ref={contentRef}
          className="overflow-y-auto flex-1"
          style={{
            maxHeight: 'calc(90vh - 30px)',
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    container
  );
};

export default CustomBottomSheet;

