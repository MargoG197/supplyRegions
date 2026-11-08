import { BaseModal } from "@/shared/ui/BaseModal";
import { EmptyState } from "./EmptyState";

interface EmptyStateModalProps {
  /** Открыта ли модалка */
  open: boolean;
  /** Колбэк открытия/закрытия (BaseModal-контракт) */
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  /** Заголовок модалки (шапка) */
  title: string;
  /** Текст эмпти-состояния под иконкой */
  emptyTitle: string;
  /** Колбэк кнопки «Назад» — по умолчанию закрывает модалку */
  onBack: () => void;
  marginAfterHeader?: boolean;
}

export const EmptyStateModal = ({
  open,
  onOpenChange,
  title,
  emptyTitle,
  onBack,
  marginAfterHeader = false,
}: EmptyStateModalProps) => {
  const handleBack = () => {
    onBack?.();
    onOpenChange(false);
  };

  return (
    <BaseModal
      title={title}
      open={open}
      onOpenChange={onOpenChange}
      marginAfterHeader={marginAfterHeader}
    >
      <EmptyState title={emptyTitle} onBack={handleBack} />
    </BaseModal>
  );
};