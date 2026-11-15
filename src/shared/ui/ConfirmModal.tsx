import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { Modal } from './Modal/Modal';

type ConfirmVariant = 'default' | 'danger';
type CancelVariant = 'default' | 'green';

interface BaseConfirmModalProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  backgroundColor?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  confirmBtnText?: ReactNode;
  cancelBtnText?: ReactNode;
  onConfirm: () => void;
  confirmBtnVariant?: ConfirmVariant
  cancelBtnVariant?: CancelVariant
}

interface SingleBtnModalProps extends BaseConfirmModalProps {
  isSingleBtn: true;
  onCancel?: never;
}

interface TwoBtnsModalProps extends BaseConfirmModalProps {
  isSingleBtn: false;
  onCancel: () => void;
}
const CONFIRM_COLOR: Record<ConfirmVariant, string> = {
  default: 'text-light-brand-green',
  danger: 'text-light-error-red', 
};
const CANCEL_COLOR: Record<CancelVariant, string> = {
  green: 'text-light-brand-green',
  default: 'text-light-gray-4', 
};
export type ConfirmModalProps = SingleBtnModalProps | TwoBtnsModalProps;

const BTN_BASE =
  'cursor-pointer w-full h-11.25 font-bodytext-regular border-t-[0.33px] ' +
  'border-light-gray-3 dark:border-light-gray-6 transition-all duration-150 ' +
  'active:bg-gray-200 dark:active:bg-light-gray-6';



export const ConfirmModal = ({
  isOpen,
  onOpenChange,
  backgroundColor = 'bg-light-gray-white',
  title,
  subtitle,
  isSingleBtn,
  confirmBtnText = 'Ок',
  cancelBtnText = 'Отмена',
  onConfirm,
  onCancel,
  confirmBtnVariant = 'default',
  cancelBtnVariant = 'default',
}: ConfirmModalProps) => {

  const confirmBtnClass = `${BTN_BASE} ${CONFIRM_COLOR[confirmBtnVariant]}`;
  const cancelBtnClass = ` ${BTN_BASE} ${CANCEL_COLOR[cancelBtnVariant]} dark:text-light-gray-1 border-r-[0.33px]`;

  return (
    <Modal
      position="center"
      animation="scale"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'confirm-modal-title' : undefined}
        aria-describedby={subtitle ? 'confirm-modal-subtitle' : undefined}
        className={`text-center w-75.5 h-fit flex flex-col justify-between ${backgroundColor} dark:bg-light-gray-7-logo rounded-m overflow-y-auto`}
      >
        <div className="text-center" onClick={e => e.stopPropagation()}>
          {title && (
            <div
              id="confirm-modal-title"
              className="pt-4 px-4 font-headline-h3 text-light-gray-black min-h-6.25 dark:text-light-gray-1"
            >
              {title}
            </div>
          )}

          {subtitle && (
            <div
              id="confirm-modal-subtitle"
              className="p-4 font-bodytext-regular"
            >
              {subtitle}
            </div>
          )}

          {isSingleBtn ? (
            <button
              type="button"
              className={confirmBtnClass}
              onClick={onConfirm}
            >
              {confirmBtnText}
            </button>
          ) : (
            <div className="flex" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                onClick={onCancel}
                className={cancelBtnClass}
              >
                {cancelBtnText}
              </button>
              <button
                type="button"
                className={confirmBtnClass}
                onClick={onConfirm}
              >
                {confirmBtnText}
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

ConfirmModal.displayName = 'ConfirmModal';