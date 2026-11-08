import CloseIcon from '~assets/icons/close.svg?react';

interface AttachedFileProps {
  /** Ссылка на картинку (например, импортированная paper.jpg) */
  src: string;
  onRemove: () => void;
}

export const AttachedFile = ({ src, onRemove }: AttachedFileProps) => {
  return (
    <div className="relative w-28.5 h-28.5 shrink-0 rounded-xs overflow-hidden bg-light-gray-2 dark:bg-light-gray-6 group">
      {/* Картинка рендерится сразу, без загрузки и ошибок */}
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
      />

      {/* Кнопка удаления (идентична AttachedPhoto) */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-light-gray-1/40 hover:bg-light-gray-1/60 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Удалить фото"
      >
        <CloseIcon className="w-3.5 h-3.5 text-light-gray-7-logo" />
      </button>
    </div>
  );
};