import classNames from 'classnames';
import { StatusIcon } from './StatusIcon';
import { Badge } from '../Badge';
import { REQUEST_STATUS_MAP, RequestItem } from '@/shared/types/constants';
import { memo } from 'react';

interface RequestStatusBaseCardProps {
  card: RequestItem;
  /** Колбэк при клике на чекбокс */
  onCheckChange?: (id: string, checked: boolean) => void;
  className?: string;
}

export const RequestStatusBaseCard = memo(({
  card,
  onCheckChange,
  className,
}: RequestStatusBaseCardProps) => {
  // Достаем данные для бейджа из нашего маппинга
  const badgeInfo = REQUEST_STATUS_MAP[card.status];

  return (
    <div
      onClick={onCheckChange && (() => onCheckChange(card.id, !card.isChecked))}
      className={classNames(
        'w-full flex items-center px-3 py-3.75 rounded-xs bg-light-gray-1 dark:bg-light-gray-6 text-left transition-colors',
        'hover:bg-light-gray-2 dark:hover:bg-light-gray-5 cursor-pointer',
        className,
      )}
    >
      {onCheckChange && <div className="shrink-0 ml-1 mr-2" onClick={(e) => e.stopPropagation()}>
        <StatusIcon
          checked={card.isChecked} 
          onChange={(val) => onCheckChange?.(card.id, val)} 
        />
      </div>}

      <div className="flex flex-col grow min-w-0">
        <span className="font-bodytext-m text-light-gray-black dark:text-light-gray-white">
          {card.name}
        </span>
        <span className="font-caption-regular text-light-gray-5 dark:text-light-gray-4">
          {card.category}
        </span>
      </div>

      <div className="shrink-0 flex flex-col text-end justify-start items-end h-full gap-1.25">
        <Badge label={badgeInfo.label} variant={badgeInfo.variant} />
        <span className="font-label-regular pr-3 font-medium text-light-gray-5 dark:text-light-gray-4">
          {card.date}
        </span>
      </div>
    </div>
  );
});