import { ReactNode } from 'react';
import classNames from 'classnames';
const textSizeMap = {
  'caption': 'font-caption-regular',
  'label': 'font-label-regular',
} as const;

interface YellowInfoBoxProps {
  /** Заголовок плашки (необязательный) */
  title?: string;
  /** Текст или контент внутри */
  children: ReactNode;
  /** Дополнительные классы для кастомизации */
  className?: string;
  fontColour?: 'text-light-text-warning-default' | 'text-light-gray-black'
  textSize?: keyof typeof textSizeMap; 
}



export const YellowInfoBox = ({ title, children, className, fontColour = 'text-light-gray-black', textSize="caption" }: YellowInfoBoxProps) => {
  return (
    <div
      className={classNames(
        'bg-light-bg-warning-secondary-hover rounded-xs py-3.75 px-3', 
        'text-light-text-warning-default',
        className
      )}
    >

      {title && (
        <h4 className="font-headline-h2">
          {title}
        </h4>
      )}
      
      <div className={classNames(fontColour, textSizeMap[textSize])}>
        {children}
      </div>
    </div>
  );
};