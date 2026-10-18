import { useMemo, useEffect } from 'react';
import CloseIcon from '~assets/icons/close.svg?react';

interface AttachedPhotoProps {
  file: File;
  onRemove: () => void;
}

export const AttachedPhoto = ({ file, onRemove }: AttachedPhotoProps) => {
  // Вычисляем URL синхронно при рендере. useMemo нужен, 
  // чтобы не создавать новый URL при каждом ререндере, если файл не менялся.
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  // Очищаем память только при размонтировании или смене файла
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="relative w-28.5 h-28.5 shrink-0 rounded-xs overflow-hidden bg-light-gray-2 dark:bg-light-gray-6 group">
      <img 
        src={previewUrl} 
        alt="Превью" 
        className="w-full h-full object-cover" 
      />
      
      {/* Кнопка удаления */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Удалить фото"
      >
        <CloseIcon className="w-3.5 h-3.5 text-white" />
      </button>
    </div>
  );
};