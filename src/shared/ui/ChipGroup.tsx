import { ReactNode } from 'react';
import classNames from 'classnames';

export interface ChipOption {
  value: string;
  label: string;
  icon?: ReactNode; // Иконка (передается как React-компонент)
}

interface ChipGroupProps {
  options: ChipOption[];
  /** Выбранные значения (массив строк) */
  value: string[];
  /** Колбэк при изменении выбора */
  onChange: (value: string[]) => void;
  /** Можно ли выбрать несколько (по умолчанию true) */
  multiple?: boolean;
  /** Заголовок над группой */
  label?: string;
}

export const ChipGroup = ({
  options,
  value,
  onChange,
  multiple = true,
  label,
}: ChipGroupProps) => {
  const handleToggle = (optionValue: string) => {
    if (multiple) {
      // Если мультивыбор: добавляем или убираем из массива
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    } else {
      // Если одиночный выбор: заменяем значение
      onChange([optionValue]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="font-caption-regular font-medium text-light-gray-black dark:text-light-gray-1">
          {label}
        </label>
      )}
      
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = value.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleToggle(option.value)}
              className={classNames(
                'flex items-center gap-1.25 px-3 h-6 rounded-full transition-colors font-label-regular',
                isSelected
                  ? 'bg-light-brand-green text-white'
                  : 'bg-light-gray-1 dark:bg-light-gray-6 text-light-gray-black dark:text-light-gray-white hover:bg-light-gray-2 dark:hover:bg-light-gray-5' // Неактивный стиль
              )}
            >
              {option.icon && (
                <span className={classNames(
                  'shrink-0',
                  isSelected ? 'text-white' : 'text-light-gray-5 dark:text-light-gray-4'
                )}>
                  {option.icon}
                </span>
              )}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};