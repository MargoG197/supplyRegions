import classNames from 'classnames';
import Check from '@/assets/icons/check.svg?react';

interface StatusIconProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'm';
  className?: string;
}

const sizeMap = {
  m: 'w-6 h-6',
};

export const StatusIcon = ({ 
  checked, 
  onChange,
  disabled = false,
  size = 'm',
  className 
}: StatusIconProps) => {
  return (
    <button
      type="button"
      role="checkbox"          // Говорим скринридерам, что это чекбокс
      aria-checked={checked}   // Сообщаем текущее состояние
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={classNames(
        'inline-flex items-center justify-center rounded-full shrink-0 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-brand-green focus-visible:ring-offset-2',
        sizeMap[size],
        checked 
          ? 'bg-light-brand-green text-light-gray-white' 
          : 'bg-light-gray-3 dark:bg-light-gray-5',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className
      )}
    >
      {checked && (
        <Check className="text-light-gray-white" />
      )}
    </button>
  );
};