// import { useMemo, useEffect } from 'react';
// import CloseIcon from '~assets/icons/close.svg?react';

// interface AttachedPhotoProps {
//   file: File;
//   onRemove: () => void;
// }

// export const AttachedPhoto = ({ file, onRemove }: AttachedPhotoProps) => {
//   // Вычисляем URL синхронно при рендере. useMemo нужен,
//   // чтобы не создавать новый URL при каждом ререндере, если файл не менялся.
//   const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

//   // Очищаем память только при размонтировании или смене файла
//   useEffect(() => {
//     return () => {
//       URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   return (
//     <div className="relative w-28.5 h-28.5 shrink-0 rounded-xs overflow-hidden bg-light-gray-2 dark:bg-light-gray-6 group">
//       <img
//         src={previewUrl}
//         alt="Превью"
//         className="w-full h-full object-cover"
//       />
      
//       {/* Кнопка удаления */}
//       <button
//         type="button"
//         onClick={onRemove}
//         className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-light-gray-1/40 hover:bg-light-gray-1/60 rounded-full transition-colors backdrop-blur-sm"
//         aria-label="Удалить фото"
//       >
//         <CloseIcon className="w-3.5 h-3.5 text-light-gray-7-logo " />
//       </button>
//     </div>
//   );
// };
import { useEffect, useState } from 'react';
import CloseIcon from '~assets/icons/close.svg?react';

interface AttachedPhotoProps {
  file: File;
  onRemove: () => void;
}

export const AttachedPhoto = ({ file, onRemove }: AttachedPhotoProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
  const url = URL.createObjectURL(file);
 
    const timer = setTimeout(() => {
    setPreviewUrl(url);
    setIsLoading(true);
    setHasError(false);
  }, 0);

  return () => {
    clearTimeout(timer);
    URL.revokeObjectURL(url);
  };
}, [file]);

  return (
    <div className="relative w-28.5 h-28.5 shrink-0 rounded-xs overflow-hidden bg-light-gray-2 dark:bg-light-gray-6 group">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-6 h-6 border-4 border-t-transparent border-light-green-9 rounded-full animate-spin" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-light-gray-3 text-light-gray-5 z-10 text-center text-xs p-2">
          Не удалось загрузить
        </div>
      )}

      {previewUrl && (
        <img
          src={previewUrl}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading || hasError ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-light-gray-1/40 hover:bg-light-gray-1/60 rounded-full transition-colors backdrop-blur-sm z-20"
        aria-label="Удалить фото"
      >
        <CloseIcon className="w-3.5 h-3.5 text-light-gray-7-logo" />
      </button>
    </div>
  );
};