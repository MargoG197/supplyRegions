import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

export type ButtonVariant = 
  | 'btn-B-GreenDefault'
  | 'btn-B-GreenInactive'
  | 'btn-B-WhiteDefault'
  | 'btn-B-GrayDefault'
  | 'btn-M-GreenDefault'
  | 'btn-M-GreenClicked'
  | 'btn-M-WhiteDefault'
  | 'btn-M-WhiteClicked'
  | 'btn-S-GreenDefault'
  | 'btn-S-GreenRevert'
  | 'btn-S-GreenInactive';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Вариант стилизации из вашего index.css */
  variant?: ButtonVariant;
  /** Дополнительные классы (например, на всю ширину w-full, если нужно перебить w-89.5) */
  className?: string;
  /** Контент кнопки (текст или иконка) */
  children: ReactNode;
}

export const Button = ({
  variant = 'btn-B-GreenDefault', // По умолчанию большая зеленая
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        // Применяем класс-утилиту, переданный в variant
        variant,
        // Добавляем базовые стили для центрирования контента и плавности
        'flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98] self-center',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};