import classNames from 'classnames';
import type { ReactNode } from 'react';

export type BadgeVariant = 
  | 'critical'  // Красный
  | 'pending'   // Желтый / Оранжевый
  | 'new'      // Синий
  | 'completed'   // Зеленый
  // | 'neutral';  // Серый (по умолчанию)

export interface BadgeProps {
  /** Текст бейджа */
  label: ReactNode;
  /** Цветовое решение */
  variant: BadgeVariant;
  /** Размер (опционально) */
  size?: 's' | 'm';
  className?: string;
  onClick?: () => void
  active?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  critical: 'bg-light-red-primary text-light-gray-white',
  pending: 'bg-light-orange-primary text-light-gray-white', 
  new: 'bg-light-blue-primary text-light-gray-white',
  completed: 'bg-light-brand-green text-light-gray-white',
  // neutral: 'bg-light-gray-1 text-light-gray-black dark:bg-light-gray-6 dark:text-light-gray-white',
};

const sizeClasses = {
  s: 'h-5 px-2 font-caption-regular',
  m: 'h-6 px-3 font-label-regular',
};

export const Badge = ({ 
  label, 
  variant, 
  size = 's',
  className,
  onClick,
  active = true,
}: BadgeProps) => {
  return (
    <span
      className={classNames(
        'inline-flex w-fit items-center justify-center rounded-full whitespace-nowrap',
        sizeClasses[size],
        variantClasses[variant],
        active ? "opacity-100" : "opacity-50",
        className
      )}
      onClick={onClick}
    >
      {label}
    </span>
  );
};