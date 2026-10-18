import { parse, isValid, format, differenceInYears } from 'date-fns';

export const isValidDateString = (dateString: string): boolean => {
  if (dateString.length !== 10) return false;
  const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date());

  // 1. Проверка, что дата вообще существует (отсеивает 31.02)
  if (!isValid(parsedDate)) return false;

  // 2. Проверка "Round-trip" (защита от автоисправлений date-fns)
  if (format(parsedDate, 'dd.MM.yyyy') !== dateString) return false;

  // 3. НОВОЕ: Проверка диапазона лет (текущий год ± 5 лет)
  const today = new Date();
  const yearDiff = differenceInYears(parsedDate, today);

  // Если разница больше 5 лет в любую сторону — дата невалидна
  if (Math.abs(yearDiff) > 100) {
    return false;
  }

  return true;
};

export const formatDateInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  let result = day;
  if (month) result += `.${month}`;
  if (year) result += `.${year}`;
  return result;
};

// --- ВЕС ---
export const formatWeightInput = (value: string) => {
  // Заменяем запятую на точку
  let formatted = value.replace(/,/g, '.');
  // Удаляем все, кроме цифр и точки
  formatted = formatted.replace(/[^\d.]/g, '');
  // Оставляем только одну точку
  const parts = formatted.split('.');
  if (parts.length > 2) {
    formatted = parts[0] + '.' + parts.slice(1).join('');
  }
  // Ограничиваем 2 знаками после точки
  if (parts.length === 2 && parts[1] && parts[1].length > 2) {
    formatted = parts[0] + '.' + parts[1].slice(0, 2);
  }
  return formatted;
};

export const isValidWeightString = (value: string): boolean => {
  if (!value) return false;
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};