// src/shared/ui/FormSelect.tsx
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import ChevronDownIcon from "~assets/icons/chevron.down.svg?react";
import CheckIcon from "~assets/icons/check.svg?react";

export interface SelectOption {
  value: string;
  label: string;
  /** Необязательное описание для второй строки (например, "Лента №102...") */
  description?: string;
}

interface FormSelectProps {
  label: string;
  hint?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FormSelect = ({
  label,
  hint,
  placeholder = "Выберите...",
  options,
  value,
  onChange,
  className,
}: FormSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрываем при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      className={classNames(
        "flex flex-col gap-1.5 w-full items-start",
        className,
      )}
      ref={dropdownRef}
    >
      <label className="font-caption-regular text-light-gray-black dark:text-light-gray-1">
        {label}
      </label>

      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            "w-full h-13.75 px-3 pt-1 bg-light-gray-1 dark:bg-light-gray-6 rounded-xs outline-none text-left flex flex-col justify-center transition-colors",
            !selectedOption
              ? "text-light-gray-4 dark:text-light-gray-5"
              : "text-light-gray-black dark:text-light-gray-white",
          )}
        >
          {selectedOption ? (
            <>
              <span className="font-bodytext-regular min-h-6 truncate block w-full min-w-0 max-w-[93%]">
                {selectedOption.label}
              </span>
              {selectedOption.description && (
                <span className="font-label-regular text-light-gray-5 dark:text-light-gray-4 mt-0.5 leading-tight">
                  {selectedOption.description}
                </span>
              )}
            </>
          ) : (
            <span className="font-bodytext-regular">{placeholder}</span>
          )}
        </button>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon
            className={classNames(
              "text-light-gray-5 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </div>
        {isOpen && (
          <div className="absolute w-full bg-light-gray-white dark:bg-light-gray-7-logo border border-light-gray-2 dark:border-light-gray-6 rounded-xs shadow-lg max-h-69.75 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  // setIsOpen(false);
                }}
                className={classNames(
                  "relative w-full px-3 py-2 text-left h-13.75 flex flex-col hover:bg-light-gray-1 dark:hover:bg-light-gray-6 transition-colors border-b border-light-gray-1 dark:border-light-gray-6 last:border-none",
                  opt.value === value && "bg-light-gray-1 dark:bg-light-gray-6",
                )}
              >
                <div
                className={classNames(
                  "font-bodytext-regular min-h-6 truncate block w-full min-w-0 text-light-gray-black dark:text-light-gray-white",
                  opt.value === value ? "max-w-[90%]" :"max-w-[97%]",
                )}>
                  {opt.label}
                </div>
                {opt.description && (
                  <span className="font-caption-regular text-light-gray-5 dark:text-light-gray-4 mt-0.5 leading-tight">
                    {opt.description}
                  </span>
                )}
                {opt.value === value && (
                  <div className="shrink-0 absolute right-5 top-[50%] text-light-gray-black dark:text-light-gray-white">
                    <CheckIcon className="text-light-gray-black" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Подсказка под полем */}
      {hint && (
        <span className="font-caption-regular text-light-gray-5 dark:text-light-gray-4">
          {hint}
        </span>
      )}
    </div>
  );
};
