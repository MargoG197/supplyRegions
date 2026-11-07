import { ReactNode } from 'react';
import classNames from 'classnames';
type TitleFont = 'font-headline-h2' | 'font-bodytext-m' | 'font-caption-regular';
type TitleColorRole =
  | 'primary'    // основной текст
  | 'secondary'  // приглушённый
  ;


// Задаем опции для отступов
type Spacing = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';

interface CardProps {
  /** Заголовок карточки (необязательный) */
  title?: string;
    /** 
   * Размер и начертание шрифта заголовка. 
   * По умолчанию 'h3'.
   */
  titleFont?: TitleFont; 
  titleColor?: TitleColorRole;
   /** Действие справа от заголовка (например, кнопка "Смотреть все") */
  headerAction?: ReactNode;
  /** Контент внутри карточки */
  children: ReactNode;
  /** Дополнительные классы (например, для смены фона) */
  className?: string;
  /** Скругление: 2xl (по умолчанию) или none */
  rounded?: 'm' | 'xs' | 'none';
    /**
   * Отступ между заголовком и контентом.
   * По умолчанию 'm' (mb-3).
   */
  titleGap?: 'none' | 'xs' | 's' | 'm' | 'l';
/** Отступ сверху */
  paddingTop?: Spacing;
  /** Отступ снизу */
  paddingBottom?: Spacing;
  borderTop?: boolean
}

const ptMap: Record<Spacing, string> = {
  none: 'pt-0',
  xs: 'pt-1',
  s: 'pt-2',
  m: 'pt-4',
  l: 'pt-5',
  xl: 'pt-8',
};

const pbMap: Record<Spacing, string> = {
  none: 'pb-0',
  xs: 'pb-1',
  s: 'pb-2',
  m: 'pb-4',
  l: 'pb-5',
  xl: 'pb-8',
};

const titleGapMap: Record<NonNullable<CardProps['titleGap']>, string> = {
  none: 'mb-0',
  xs: 'mb-1',
  s: 'mb-2',
  m: 'mb-3',
  l: 'mb-4',
};

const TITLE_COLOR_CLASSES: Record<TitleColorRole, string> = {
  primary:   'text-light-gray-black dark:text-light-gray-white',
  secondary: 'text-light-gray-5 dark:text-light-gray-4',
};

export const Card = ({ 
  title, 
  titleFont = 'font-headline-h2',
  headerAction,
  children, 
  className,
  rounded = 'm',
  titleGap = 'm',
  paddingTop = 'm',
  paddingBottom = 'm',
  titleColor = "primary",
  borderTop = false,
}: CardProps) => {
  const hasHeader = Boolean(title || headerAction);
  return (
    <div 
      className={classNames(
        'w-full max-w-125 min-h-14.25 mx-auto flex flex-col text-left items-start p-4',
        ptMap[paddingTop],
        pbMap[paddingBottom],
        borderTop && 'border-t-[0.33px]',
        'bg-light-gray-white dark:bg-light-gray-7-logo',
        {
          'rounded-m': rounded === 'm',
          'rounded-none': rounded === 'none',
          'rounded-xs': rounded === 'xs',
        },
        className 
      )}
    >
      {/* Шапка карточки */}
      {hasHeader && (
        <div 
          className={classNames(
            'w-full flex items-center justify-between gap-1',
            // Отступ снизу до контента
            titleGapMap[titleGap] 
          )}
        >
          {title ? (
            <h2 className={classNames(
            TITLE_COLOR_CLASSES[titleColor],
            titleFont
          )}>
              {title}
            </h2>
          ) : (
            <span /> // Пустышка, чтобы justify-between прижал экшен вправо, если нет заголовка
          )}

          {headerAction && (
            <div className="shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}
      
      {/* Контент карточки */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};