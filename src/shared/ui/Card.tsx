import { ReactNode } from 'react';
import classNames from 'classnames';

interface CardProps {
  /** Заголовок карточки (необязательный) */
  title?: string;
  /** Контент внутри карточки */
  children: ReactNode;
  /** Дополнительные классы (например, для смены фона) */
  className?: string;
  /** Скругление: 2xl (по умолчанию) или none */
  rounded?: 'm' | 'none';
}

export const Card = ({ 
  title, 
  children, 
  className,
  rounded = 'm' 
}: CardProps) => {
  return (
    <div 
      className={classNames(
        'w-full max-w-125 p-4 min-h-14.25 mx-auto flex flex-col items-start',
        'bg-light-gray-white dark:bg-light-gray-7-logo',
        {
          'rounded-m': rounded === 'm',
          'rounded-none': rounded === 'none',
        },
        className 
      )}
    >
      {title && (
        <h2 className="font-headline-h3 text-light-gray-black dark:text-light-gray-white mb-3">
          {title}
        </h2>
      )}
      
      {/* Контент карточки */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};