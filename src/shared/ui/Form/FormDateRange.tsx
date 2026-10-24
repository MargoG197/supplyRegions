import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import classNames from "classnames";
import CalendarIcon from "~assets/icons/calendar.svg?react";
import {
  inputBaseClasses,
  inputLabelClasses,
  inputHintClasses,
} from "./input.styles";
import { Modal } from "../Modal//Modal";
import { ru } from "date-fns/locale";
import Arrow_left from "~assets/icons/chevron.left.svg?react";

export type DateRangeValue = { from?: Date; to?: Date };
interface FormDateRangeProps {
  label?: string;
  hint?: string;
  value: { from?: Date; to?: Date };
  onChange: (range: DateRangeValue) => void;
  className?: string;
}

export const FormDateRange = ({
  label = "Даты",
  hint,
  value,
  onChange,
  className,
}: FormDateRangeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Форматируем даты в строку для отображения
  const displayValue =
    value.from || value.to
      ? `${value.from ? format(value.from, "dd.MM.yyyy") : "ДД.ММ.ГГГГ"} — ${value.to ? format(value.to, "dd.MM.yyyy") : "ДД.ММ.ГГГГ"}`
      : "";

  // Закрытие по клику вне
  useEffect(() => {
    if (!isOpen) return; // Слушаем только когда открыто

    const handleClickOutside = (e: MouseEvent) => {
      // 1. Проверяем, что клик не внутри нашего инпута
      if (containerRef.current?.contains(e.target as Node)) {
        return;
      }

      // 2. Проверяем, что клик не внутри портала модалки
      // (предполагаем, что у тебя портал имеет id="modal-portal")
      const modalPortal = document.getElementById("modal-portal");
      if (modalPortal && modalPortal.contains(e.target as Node)) {
        return;
      }

      // Если клик был вне инпута и вне модалки — закрываем
      setIsOpen(false);
    };

    // Используем mousedown, чтобы срабатывало до onClick
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]); // Добавили isOpen в зависимости

  return (
    <div
      className="flex flex-col gap-1.5 pt-0.5 w-full relative"
      ref={containerRef}
    >
      {label && <label className={inputLabelClasses}>{label}</label>}

      <div className="relative w-full">
        <input
          type="text"
          readOnly
          value={displayValue}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          placeholder="ДД.ММ.ГГГГ - ДД.ММ.ГГГГ"
          className={classNames(
            inputBaseClasses,
            "pr-10 cursor-pointer",
            className,
          )}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <CalendarIcon className="w-5 h-5 text-light-gray-4" />
        </div>
      </div>

      {hint && <span className={inputHintClasses}>{hint}</span>}

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        position="center"
        animation="scale"
      >
        <div
          className="max-w-125 mx-auto h-fit w-full bg-light-gray-white dark:bg-light-gray-7-logo border border-light-gray-2 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <DayPicker
            mode="range"
            selected={value as DateRange}
            onSelect={(range) => {
              onChange(
                range
                  ? { from: range.from, to: range.to }
                  : { from: undefined, to: undefined },
              );
            }}
            locale={ru}
            numberOfMonths={1}
            showOutsideDays={true}
            className="font-bodytext-regular text-light-gray-black dark:text-light-gray-white w-full max-w-125"
            components={{
              PreviousMonthButton: ({ onClick, disabled }) => (
                <button
                  type="button"
                  onClick={onClick}
                  disabled={disabled}
                  className="absolute left-6 top-2 z-10 flex items-center justify-center bg-transparent hover:opacity-70 transition-opacity disabled:opacity-30 cursor-pointer"
                >
                  <Arrow_left className="w-10 h-10" /> {/* Твой размер */}
                </button>
              ),
              NextMonthButton: ({ onClick, disabled }) => (
                <button
                  type="button"
                  onClick={onClick}
                  disabled={disabled}
                  className="absolute right-6 top-2 z-10 flex items-center justify-center bg-transparent hover:opacity-70 transition-opacity disabled:opacity-30 cursor-pointer"
                >
                  <Arrow_left className="w-10 h-10 rotate-180" />
                </button>
              ),
            }}
            formatters={{
              formatCaption: (date) => {
                const month = format(date, "LLLL", { locale: ru });
                const year = format(date, "yyyy", { locale: ru });
                const capitalizedMonth =
                  month.charAt(0).toUpperCase() + month.slice(1);
                return `${capitalizedMonth}, ${year}`;
              },
              formatWeekdayName: (date) => {
                      const weekday = format(date, "EEEEEE", { locale: ru });

                const capitalized =
                  weekday.charAt(0).toUpperCase() + weekday.slice(1);
                const replacements: Record<string, string> = {
                  Пн: "Пон",
                  Вт: "Вт",
                  Ср: "Ср",
                  Чт: "Чет",
                  Пт: "Пят",
                  Сб: "Сб",
                  Вс: "Вос",
                };

                return replacements[capitalized] || capitalized;
              },
            }}
            classNames={{
              root: "relative w-full max-w-125",
              months: "flex flex-col w-full px-7.75 pb-2",

              // Хедер (Месяц, Год + Стрелки)
              month_caption:
                "relative flex items-center justify-center h-10 mb-2 w-full h-[57px]",
              caption_label:
                "font-bodytext-m text-light-gray-4 dark:text-light-gray-white text-center",

              // Таблица дней (используем grid для равномерного распределения)
              month_grid: "w-full border-collapse",
              weekdays: "pb-1.75 grid grid-cols-7 gap-[10px] w-full",
              weekday:
                "font-label-regular text-center pb-2 flex items-center justify-center",
              week: "h-[40px] grid grid-cols-7 gap-[10px] w-full mt-1",

              // Ячейки дней (делаем их квадратными)
              day: "text-center font-bodytext-m p-0 relative focus-within:relative focus-within: h-[33px] w-[32px]",

              // Кнопка внутри ячейки (круглая, но без фона для обычных дней)
              day_button:
                "h-[33px] w-[32px] p-0 font-bodytext-m rounded-full flex items-center justify-center transition-colors hover:bg-light-gray-2 dark:hover:bg-light-gray-6",

              range_start: "bg-light-brand-green text-white rounded-full",
              range_end: "bg-light-brand-green text-white rounded-full",

              range_middle:
                "bg-light-brand-green text-light-gray-black rounded-full hover:bg-light-brand-green/30",

              selected:
                "bg-light-brand-green text-white hover:bg-light-brand-green rounded-full",

              today: "font-bold text-light-brand-green",
              outside: "text-light-gray-4",
              disabled: "text-light-gray-4 ",
              hidden: "invisible",
            }}
            footer={
              <div className="border-t border-light-gray-2 dark:border-light-gray-5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 h-11.25 text-light-brand-green font-bodytext-regular hover:opacity-80 transition-opacity"
                >
                  Ок
                </button>
              </div>
            }
          />
        </div>
      </Modal>
    </div>
  );
};
