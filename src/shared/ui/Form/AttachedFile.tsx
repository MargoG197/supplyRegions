import classNames from 'classnames';
import ClipIcon from '~assets/icons/paper.clip.svg?react';
import CloseIcon from '~assets/icons/close.svg?react'; // Иконка крестика

interface AttachedFileProps {
  fileName: string;
  onRemove: () => void;
  className?: string;
}

export const AttachedFile = ({ fileName, onRemove, className }: AttachedFileProps) => {
  return (
    <div 
      className={classNames(
        'flex items-center justify-between w-full h-13.75 px-3 bg-light-gray-1 dark:bg-light-gray-6 rounded-xs',
        className
      )}
    >
      <div className="flex items-center gap-0.5 overflow-hidden">
        <ClipIcon className="shrink-0 text-light-gray-5 dark:text-light-gray-4" />
        <span className="font-bodytext-regular text-light-gray-black dark:text-light-gray-white truncate">
          {fileName}
        </span>
      </div>
      
      <button 
        type="button" 
        onClick={onRemove}
        className="shrink-0 p-1 ml-2 rounded-full hover:bg-light-gray-2 dark:hover:bg-light-gray-5 transition-colors"
        aria-label="Удалить файл"
      >
        <CloseIcon className="text-light-gray-black dark:text-light-gray-white" />
      </button>
    </div>
  );
};