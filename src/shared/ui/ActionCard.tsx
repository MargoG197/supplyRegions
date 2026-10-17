import { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ActionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Текст внутри карточки (может быть многострочным) */
  label: ReactNode;
  /** Иконка (передается как React-компонент, например, из svg?react) */
  icon?: ReactNode;
  /** Дополнительные классы (например, для кастомного фона) */
  className?: string;
}

export const ActionCard = ({
  label,
  icon,
  className,
  ...props
}: ActionCardProps) => {
  return (
    <button
      className={classNames(
        // Базовые стили: серый фон, скругления, отступы, гибкость
        'flex items-start w-full p-4 gap-2 rounded-xs text-left transition-colors',
        'bg-light-gray-1 dark:bg-light-gray-6',
        'hover:bg-light-gray-2 dark:hover:bg-light-gray-5 active:scale-[0.98]',
        'text-light-gray-black dark:text-light-gray-white',
        className // Позволяет переопределить фон или добавить рамки
      )}
      {...props}
    >
      {icon && (
        <div className="shrink-0">
          {icon}
        </div>
      )}
      
      <div className="font-bodytext-m">
        {label}
      </div>
    </button>
  );
};