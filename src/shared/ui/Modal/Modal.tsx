import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChangeComment?: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  onOpenChangeComment, 
  children 
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

   


  // Управление классом для body
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

  const ModalContent = (
    <div 
      onClick={() => { 
        onOpenChange(false); 
        onOpenChangeComment?.(); 
      }}
    >
      <div 
        onClick={() => { 
          onOpenChange(false); 
          onOpenChangeComment?.(); 
        }}
      >
        <div className="fixed inset-0 bg-black opacity-60" />
        <div 
          className="text-left fixed inset-0 flex items-end justify-center" 
          onClick={() => onOpenChange(false)}
        >
          {children}
        </div>
      </div>ы
    </div>
  );

  return createPortal(ModalContent, container);
};

// import React, { useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';

// interface IModalProps {
//   isOpen: boolean;
//   onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
//   onOpenChangeComment?: () => void;
//   children: React.ReactNode;
//   noColor?: boolean;
//   zIndex?: boolean;
// }

// export const Modal: React.FC<IModalProps> = ({
//   isOpen,
//   onOpenChange,
//   onOpenChangeComment,
//   children,
//   noColor = false,
//   zIndex = false,
// }) => {
//   const scrollPosition = useRef(0);

//   // Управление скроллом страницы и классами
//   useEffect(() => {
//     const body = document.body;
    
//     if (isOpen) {
//       // Сохраняем позицию скролла
//       scrollPosition.current = window.scrollY;
      
//       // Блокируем скролл
//       body.classList.add('popup-open');
//       body.style.position = 'fixed';
//       body.style.top = `-${scrollPosition.current}px`;
//       body.style.width = '100%';
//     } else {
//       // Восстанавливаем скролл
//       body.classList.remove('popup-open');
//       body.style.position = '';
//       body.style.top = '';
//       body.style.width = '';
//       window.scrollTo(0, scrollPosition.current);
//     }

//     return () => {
//       // Очистка при размонтировании
//       body.classList.remove('popup-open');
//       body.style.position = '';
//       body.style.top = '';
//       body.style.width = '';
//     };
//   }, [isOpen]);

//   const handleClose = () => {
//     onOpenChange(false);
//     onOpenChangeComment?.();
//   };

//   const handleModalClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//   };

//   if (!isOpen) return null;

//   const overlayClass = noColor 
//     ? "text-left fixed inset-0" 
//     : "fixed inset-0 bg-black opacity-30";

//   const modalClass = noColor
//     ? `text-left ${zIndex ? 'z-[51]' : 'z-[2]'} fixed inset-0 flex items-end justify-center`
//     : `text-left ${zIndex ? 'z-[51]' : 'z-[2]'} fixed inset-0 flex items-end backdrop-blur-[2px] justify-center`;

//   return createPortal(
//     <div className="fixed inset-0" onClick={handleClose}>
//       <div className={overlayClass} />
//       <div className={modalClass} onClick={handleModalClick}>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };
