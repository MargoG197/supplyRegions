import classNames from 'classnames';
import ClipIcon from '~assets/icons/paper.clip.svg?react';
import CloseIcon from '~assets/icons/close.svg?react';
import DownloadIcon from '~assets/icons/download.svg?react'
import { twMerge } from 'tailwind-merge';

type BaseProps = {
  fileName: string;
  className?: string;
};

type RemoveActionProps = BaseProps & {
  action: 'remove';
  onRemove: () => void;
  onDownload?: never;
};

type DownloadActionProps = BaseProps & {
  action: 'download';
  onDownload: () => void;
  onRemove?: never;
};

type AttachedFileProps = RemoveActionProps | DownloadActionProps;

export const AttachedFile = (props: AttachedFileProps) => {
  const { fileName, className, action } = props;

  return (
    <div 
      className={twMerge(
        classNames(
          'flex items-center justify-between w-full h-13.75 px-3 bg-light-gray-1 dark:bg-light-gray-6 rounded-xs',
          className
        )
      )}
    >
      <div className="flex items-center gap-0.5 overflow-hidden">
        <ClipIcon className="shrink-0 text-light-gray-5 dark:text-light-gray-4" />
        <span className="font-bodytext-regular text-light-gray-black dark:text-light-gray-white truncate">
          {fileName}
        </span>
      </div>
      
      {action === 'remove' ? (
        <button 
          type="button" 
          onClick={props.onRemove}
          className="shrink-0 p-1 ml-2 rounded-full hover:bg-light-gray-2 dark:hover:bg-light-gray-5 transition-colors"
          aria-label="Удалить файл"
        >
          <CloseIcon className="text-light-gray-black dark:text-light-gray-white" />
        </button>
      ) : (
        <button 
          type="button" 
          onClick={props.onDownload}
          className="shrink-0 p-1 ml-2 rounded-full hover:bg-light-gray-2 dark:hover:bg-light-gray-5 transition-colors"
          aria-label="Скачать файл"
        >
          <DownloadIcon className="text-light-gray-black dark:text-light-gray-white" />
        </button>
      )}
    </div>
  );
};