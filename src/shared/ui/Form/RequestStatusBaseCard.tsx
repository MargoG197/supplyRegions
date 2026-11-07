import classNames from 'classnames';
// import { REQUEST_STATUS_MAP, type RequestStatus } from './requestStatusMap';
import { StatusIcon } from './StatusIcon';
import { Badge } from '../Badge';
import { RequestStatus } from '@/widgets/Requests/DariEduRequestsWidget';
import { REQUEST_STATUS_MAP } from '@/shared/types/constants';

interface RequestStatusBaseCardProps {
  name: string;
  category: string;
  status: RequestStatus;
  date: string;
  /** Состояние чекбокса */
  checked?: boolean;
  /** Колбэк при клике на чекбокс */
  onCheckChange?: (checked: boolean) => void;
  /** Колбэк при клике на всю карточку */
  onClick?: () => void;
  className?: string;
}

export const RequestStatusBaseCard = ({
  name,
  category,
  status,
  date,
  checked = false,
  onCheckChange,
  onClick,
  className,
}: RequestStatusBaseCardProps) => {
  const Component = onClick ? 'button' : 'div';
  
  // Достаем данные для бейджа из нашего маппинга
  const badgeInfo = REQUEST_STATUS_MAP[status];

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={classNames(
        'w-full flex items-center gap-3 p-3 rounded-xs bg-light-gray-1 dark:bg-light-gray-6 text-left transition-colors',
        onClick && 'hover:bg-light-gray-2 dark:hover:bg-light-gray-5 cursor-pointer',
        className,
      )}
    >
      {/* ЛЕВЫЙ БЛОК: Иконка статуса (чекбокс) */}
      <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
        <StatusIcon
          checked={checked} 
          onChange={(val) => onCheckChange?.(val)} 
        />
      </div>

      {/* ЦЕНТРАЛЬНЫЙ БЛОК: Имя и категория */}
      <div className="flex flex-col grow min-w-0">
        <span className="font-bodytext-m text-light-gray-black dark:text-light-gray-white truncate">
          {name}
        </span>
        <span className="font-caption-regular text-light-gray-5 dark:text-light-gray-4 truncate">
          {category}
        </span>
      </div>

      {/* ПРАВЫЙ БЛОК: Бейдж и дата */}
      <div className="shrink-0 flex flex-col items-end justify-center gap-1">
        <Badge label={badgeInfo.label} variant={badgeInfo.variant} />
        <span className="font-caption-regular text-light-gray-5 dark:text-light-gray-4">
          {date}
        </span>
      </div>
    </Component>
  );
};