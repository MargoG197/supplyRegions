import { create } from 'zustand';

interface ScannerState {
  isOpen: boolean;
  onScanCallback: ((text: string) => void) | null;
  openScanner: (onScan: (text: string) => void) => void;
  closeScanner: () => void;
}

export const useScannerStore = create<ScannerState>((set) => ({
  isOpen: false,
  onScanCallback: null,

  openScanner: (onScan) =>
    set({
      isOpen: true,
      onScanCallback: onScan,
    }),

  closeScanner: () =>
    set({
      isOpen: false,
      onScanCallback: null,
    }),
}));