import classNames from 'classnames';

interface StatusCardProps {
  /** Текст слева (например, "Новые заявки") */
  label: string;
  /** Число или текст справа (например, "28"). Если не передан, текст растянется на всю ширину */
  value?: string | number;
  /** Дополнительные классы для настройки фона и цвета текста */
  className?: string;
  /** Цвет текста (можно переопределить) */
  textClassName?: string;
  /** Обработчик клика (если плашка кликабельная) */
  onClick?: () => void;
}

export const StatusCard = ({
  label,
  value,
  className,
  textClassName = 'text-light-gray-black dark:text-light-gray-white leading-tight',
  onClick,
}: StatusCardProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        // Базовые стили: скругления, отступы, гибкость
        'flex items-center justify-between w-full p-4 rounded-xs transition-colors h-13.75',
        // Если передана функция onClick, делаем курсор-указатель и ховер
        onClick && 'cursor-pointer hover:opacity-90 active:scale-[0.99]',
        // Внешние классы (фон, кастомные цвета)
        className
      )}
    >
      <span className={classNames('font-bodytext-regular', textClassName)}>
        {label}
      </span>

      {/* Если value передан, показываем его справа */}
      {value !== undefined && (
        <span className={classNames('font-bodytext-regular', textClassName)}>
          {value}
        </span>
      )}
    </div>
  );
};