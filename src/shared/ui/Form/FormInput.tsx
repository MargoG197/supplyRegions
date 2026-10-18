import { InputHTMLAttributes, forwardRef, useState, useEffect } from "react";
import classNames from "classnames";
import {
  formatDateInput,
  isValidDateString,
  formatWeightInput,
  isValidWeightString,
} from "~/shared/lib/validateDate";

type InputMode = "text" | "date" | "weight";

interface FormInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  hint?: string;
  mode?: InputMode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, hint, className, mode = "text", onChange, value, ...props },
    ref,
  ) => {
    const [error, setError] = useState<string | null>(null);

    // Валидация при изменении значения
    useEffect(() => {
      if (typeof value !== "string") return;

      if (mode === "date") {
        if (value.length === 10) {
          setError(
            isValidDateString(value)
              ? null
              : "Проверьте формат и значение даты",
          );
        } else {
          setError(null);
        }
      } else if (mode === "weight") {
        if (value && !isValidWeightString(value)) {
          setError("Введите корректный вес");
        } else {
          setError(null);
        }
      }
    }, [value, mode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let formatted = e.target.value;

      if (mode === "date") {
        formatted = formatDateInput(formatted);
      } else if (mode === "weight") {
        formatted = formatWeightInput(formatted);
      }

      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formatted },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    };

    const displayHint = error || hint;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="font-caption-regular text-light-gray-black dark:text-light-gray-1">
          {label}
        </label>

        <input
          ref={ref}
          value={value}
          onChange={handleChange}
          type="text"
          inputMode={
            mode === "date" ? "numeric" : mode === "weight" ? "decimal" : "text"
          }
          className={classNames(
            "w-full min-h-12 px-3 py-3.75 bg-light-gray-1 dark:bg-light-gray-6 rounded-xs outline-none",
            "font-bodytext-regular text-light-gray-black dark:text-light-gray-white",
            "placeholder:text-light-gray-4 dark:placeholder:text-light-gray-5",
            error && "ring-1 ring-light-error-red ",
            className,
          )}
          {...props}
        />

        {displayHint && (
          <span
            className={classNames(
              "font-caption-regular",
              error
                ? "text-light-error-red"
                : "text-light-gray-5 dark:text-light-gray-4",
            )}
          >
            {displayHint}
          </span>
        )}
      </div>
    );
  },
);
FormInput.displayName = "FormInput";
