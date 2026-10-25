import { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ActionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Текст внутри карточки (может быть многострочным) */
  label: ReactNode;
  /** Иконка (передается как React-компонент, например, из svg?react) */
  icon?: ReactNode;
  /** Дополнительные классы для кнопки (например, для кастомного фона) */
  className?: string;
  labelFontSizeOption?: 'font-bodytext-m' | 'font-bodytext-regular';
  labelFontTrackingOption?: 'tracking-normal' | 'tracking-wide';
}

export const ActionCard = ({
  label,
  icon,
  className,
  labelFontSizeOption = 'font-bodytext-m',
  labelFontTrackingOption,
  ...props
}: ActionCardProps) => {
  return (
    <button
      className={classNames(
        'flex items-start w-full p-4 gap-3 rounded-xs text-left transition-colors',
        'bg-light-gray-1 dark:bg-light-gray-6',
        'hover:bg-light-gray-2 dark:hover:bg-light-gray-5 active:scale-[0.98]',
        'text-light-gray-black dark:text-light-gray-white',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="shrink-0 pt-1.25">
          {icon}
        </div>
      )}
      
      <div className={classNames(
        labelFontSizeOption, labelFontTrackingOption, 'text-wrap h-auto')} >
        {label}
      </div>
    </button>
  );
};