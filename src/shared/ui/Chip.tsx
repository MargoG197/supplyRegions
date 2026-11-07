import classNames from 'classnames';
import type { ReactNode } from 'react';

export interface ChipProps {
  label: ReactNode;
  /** Иконка слева (опционально) */
  icon?: ReactNode;
  /** Иконка справа / кнопка-действие (опционально) */
  actionIcon?: ReactNode;
  onClick?: () => void;
  onActionClick?: (e: React.MouseEvent) => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  selectedBackground?: string
  bgColor?: "bg-light-gray-1" | "bg-none"
}

export const Chip = ({
  label,
  icon,
  actionIcon,
  onClick,
  onActionClick,
  selected = false,
  disabled = false,
  selectedBackground = 'bg-light-red-primary',
  bgColor = 'bg-light-gray-1',
  className,
}: ChipProps) => {
  const isInteractive = Boolean(onClick);

  const baseClasses = classNames(
    'inline-flex w-fit items-center gap-1.25 px-3 h-6 rounded-full transition-colors font-label-regular',
    selected
      ? ' text-light-gray-white ' + selectedBackground
      : ' dark:bg-light-gray-6 text-light-gray-black dark:text-light-gray-white ' + bgColor,
    // hover только для интерактивных и не disabled
    isInteractive && !disabled && !selected &&
      'hover:bg-light-gray-2 dark:hover:bg-light-gray-5',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  const iconColor = selected
    ? 'text-white'
    : 'text-light-gray-5 dark:text-light-gray-4';

  const content = (
    <>
      {icon && <span className={classNames('shrink-0', iconColor)}>{icon}</span>}
      <span>{label}</span>
      {actionIcon && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onActionClick?.(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onActionClick?.(e as unknown as React.MouseEvent);
            }
          }}
          className={classNames(
            'shrink-0 inline-flex items-center justify-center rounded-full',
            'hover:opacity-70 transition-opacity',
            iconColor,
          )}
        >
          {actionIcon}
        </span>
      )}
    </>
  );

  // Если клика нет — рендерим как div (чип-метка)
  if (!isInteractive) {
    return <span className={baseClasses}>{content}</span>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
};