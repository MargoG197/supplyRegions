export const formatDateInput = (value: string) => {
  // Удаляем всё, кроме цифр
  const digits = value.replace(/\D/g, '');
  
  // Ограничиваем длину (8 цифр = ДДММГГГГ)
  const limitedDigits = digits.slice(0, 8);

  // Разбиваем на части и собираем с точками
  const day = limitedDigits.slice(0, 2);
  const month = limitedDigits.slice(2, 4);
  const year = limitedDigits.slice(4, 8);

  let result = day;
  if (month) result += `.${month}`;
  if (year) result += `.${year}`;

  return result;
};