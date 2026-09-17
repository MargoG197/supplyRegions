import { useScannerStore } from '~shared/store/scannerStore';
import { QrScannerModal } from '~features/index';

export const ScannerProvider = () => {
  const { isOpen, onScanCallback, closeScanner } = useScannerStore();

  const handleScanSuccess = (text: string) => {
    onScanCallback?.(text);
  };

  return (
    <QrScannerModal
      isOpen={isOpen}
      onClose={closeScanner}
      onScanSuccess={handleScanSuccess}
    />
  );
};