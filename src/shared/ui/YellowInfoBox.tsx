import { ReactNode } from 'react';
import classNames from 'classnames';
import CloseIcon from '~assets/icons/close.svg?react';

const textSizeMap = {
  caption: 'font-caption-regular',
  label: 'font-label-regular',
} as const;

interface YellowInfoBoxProps {
  title?: string;
  children: ReactNode;
  className?: string;
  fontColour?: 'text-light-text-warning-default' | 'text-light-gray-black';
  textSize?: keyof typeof textSizeMap;
  onClose?: () => void;
  closeLabel?: string;
}

export const YellowInfoBox = ({
  title,
  children,
  className,
  fontColour = 'text-light-gray-black',
  textSize = 'caption',
  onClose,
  closeLabel = 'Закрыть',
}: YellowInfoBoxProps) => {
  return (
    <div
      className={classNames(
        'bg-light-bg-warning-secondary-hover rounded-xs py-3.75 px-3',
        'text-light-text-warning-default ',
        onClose && 'relative pr-10',
        className,
      )}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-3 right-2 inline-flex items-center justify-center w-6 h-6 rounded-full text-light-text-warning-default hover:opacity-70 transition-opacity"
        >
          <CloseIcon className="w-3.5 h-3.5 text-light-text-warning-default" />
        </button>
      )}
      {title && <h2 className="font-headline-h2 pr-6">{title}</h2>}
      <div className={classNames(fontColour, textSizeMap[textSize])}>
        {children}
      </div>
    </div>
  );
};