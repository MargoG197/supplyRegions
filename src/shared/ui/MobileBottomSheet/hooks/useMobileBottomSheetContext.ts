import { createContext, useContext } from 'react'; interface BottomSheetContextValue {
    handleClose: () => void;
}

export const MobileBottomSheetContext = createContext<BottomSheetContextValue>({
    handleClose: () => {
    throw new Error('handleClose is not provided by parent <MobileBottomSheetContext.Provider />');
    },
});

export const useMobileBottomSheetContext = (): BottomSheetContextValue => {
    return useContext(MobileBottomSheetContext);
};