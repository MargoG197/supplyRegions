import React, { useEffect, useRef } from 'react';
import { CustomBottomSheet } from './CustomBottomSheet';
import { MobileBottomSheetContext } from './hooks/useMobileBottomSheetContext';

interface MobileBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  closeOnClickOutside?: boolean;
  swipeToClose?: boolean;
  swipeThreshold?: number;
  showSwiper?: boolean;
  header?: React.ReactNode;
  maxHeight?: string | number;
  className?: string;
  contentClassName?: string;
}

export const MobileBottomSheet = (props: MobileBottomSheetProps) => {
  const {
    open,
    setOpen,
    children = null,
    closeOnClickOutside = true,
    swipeToClose = true,
    swipeThreshold = 100,
  } = props;

  const handleClose = React.useCallback(() => {
  setOpen(false);
  }, [setOpen]);
  
  const contextValue = React.useMemo(() => {
    return {
      handleClose: handleClose,
    };
  }, [handleClose]);

  const scrollPosition = useRef(0);
  
    useEffect(() => {
        if (open) {
          scrollPosition.current = window.scrollY;
          document.body.style.position = 'fixed';
          document.body.style.top = `-${scrollPosition.current}px`;
          document.body.style.width = '100%';
        } else {
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';

          window.scrollTo(0, scrollPosition.current);
        }
    
        return () => {

          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
        };
    }, [open]);
  
  return (
    <CustomBottomSheet
      isOpen={open}
      onClose={handleClose}
      closeOnClickOutside={closeOnClickOutside}
      swipeToClose={swipeToClose}
      swipeThreshold={swipeThreshold}
    >
      <MobileBottomSheetContext.Provider value={contextValue}>
        {children}
      </MobileBottomSheetContext.Provider>
    </CustomBottomSheet>
  );
};

MobileBottomSheet.displayName = 'MobileBottomSheet';