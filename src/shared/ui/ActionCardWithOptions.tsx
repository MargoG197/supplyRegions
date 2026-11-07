import { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ActionCardWithOptionsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Текст внутри карточки (может быть многострочным) */
  label: ReactNode;
  /** Иконка (передается как React-компонент, например, из svg?react) */
  icon?: ReactNode;
  classNameIcon?: string
  /** Дополнительные классы для кнопки (например, для кастомного фона) */
  className?: string;
  borderRadius?: string;
  labelFontSizeOption?: 'font-bodytext-m' | 'font-bodytext-regular';
  labelFontTrackingOption?: 'tracking-normal' | 'tracking-wide';
  classNameText?: string
  children?: React.ReactNode;
}

export const ActionCardWithOptions = ({
  label,
  icon,
  className,
  borderRadius = 'rounded-m',
  labelFontSizeOption = 'font-bodytext-m',
  labelFontTrackingOption,
  children,
  ...props
}: ActionCardWithOptionsProps) => {
  return (
    <button
      className={classNames(
        'flex flex-col w-full py-3.75 px-4 gap-0.5 text-left transition-colors',
        'bg-light-gray-1 dark:bg-light-gray-6',
        'hover:bg-light-gray-2 dark:hover:bg-light-gray-5 active:scale-[0.98]',
        'text-light-gray-black dark:text-light-gray-white',
        borderRadius,
        className
      )}
      {...props}
    >
      {icon && (
        <div className={classNames(
        'shrink-0 m-1',
        props.classNameIcon)} >
          {icon}
        </div>
      )}
      
      <div className={classNames(
        labelFontSizeOption, labelFontTrackingOption, 'text-wrap',
        props.classNameText)} >
        {label}
      </div>
      <div>
        {children}
      </div>
    </button>
  );
};