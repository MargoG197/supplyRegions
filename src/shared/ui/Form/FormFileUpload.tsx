import { useRef, ChangeEvent } from 'react';
import classNames from 'classnames';
import ClipIcon from '~assets/icons/paper.clip.svg?react';
import CameraIcon from '~assets/icons/camera.svg?react';

type FileMode = 'document' | 'image';

interface FormFileUploadProps {
  label: React.ReactNode;
  buttonText: string;
  /** Режим: document (PDF, Word, Excel) или image (JPEG, PNG, HEIC) */
  mode?: FileMode;
  /** Максимальное количество файлов (для фото = 3, для акта = 1) */
  maxFiles?: number;
  /** Колбэк при выборе файлов */
  onFilesSelect?: (files: File[]) => void; 
}

// Предустановленные настройки для каждого режима
const MODE_CONFIG = {
  document: {
    icon: <ClipIcon />,
    accept: ".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    multiple: false,
  },
  image: {
    icon: <CameraIcon />,
    accept: "image/*",
    multiple: true,
  },
};

export const FormFileUpload = ({
  label,
  buttonText,
  mode = 'document',
  maxFiles,
  onFilesSelect,
}: FormFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = MODE_CONFIG[mode];

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let files = Array.from(e.target.files);

      if (maxFiles && files.length > maxFiles) {
        files = files.slice(0, maxFiles);
      }

      onFilesSelect?.(files);
      e.target.value = ''; 
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-caption-regular font-medium text-light-gray-black dark:text-light-gray-1">
        {label}
      </label>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={config.accept}
        multiple={config.multiple}
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className={classNames(
          'w-fit h-10.75 pl-3 pr-5 flex items-center justify-start rounded-xs transition-colors',
          'bg-transparent border border-light-brand-green text-light-gray-black dark:text-light-gray-white',
          'hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-[0.99]'
        )}
      >
        <div className="shrink-0 text-light-gray-black dark:text-light-gray-white">
          {config.icon}
        </div>
        <span className="font-bodytext-regular">{buttonText}</span>
      </button>
    </div>
  );
};