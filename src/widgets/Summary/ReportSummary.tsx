export const ReportSummary = () => {
  return (
    <div className="flex justify-between items-start w-full">
      {/* ЛЕВАЯ ЧАСТЬ: Список данных */}
      <div className="flex flex-col gap-1 grow w-full max-w-[40%]">
        <div className="flex justify-between w-full items-center">
          <div className=" font-caption-regular text-light-gray-4 dark:text-light-gray-3">
            Выемки
          </div>
          <div className="font-caption-regular text-light-gray-black dark:text-light-gray-white">
            491.1 кг
          </div>
        </div>

        <div className="flex justify-between w-full items-center">
          <span className="font-caption-regular text-light-gray-4 dark:text-light-gray-3">
            Списания
          </span>
          <span className="font-caption-regular text-light-gray-black dark:text-light-gray-white">
            14.2 кг
          </span>
        </div>

        <div className="flex justify-between w-full items-center">
          <span className=" font-caption-regular text-light-gray-4 dark:text-light-gray-3">
            Раздачи
          </span>
          <span className="font-caption-regular text-light-gray-black dark:text-light-gray-white">
            352.5 кг
          </span>
        </div>
      </div>

      <div className="bg-[#FFEDC2] rounded-xs p-2.5 flex flex-col items-center justify-center min-w-25 min-h-18">
        <span className="font-headline-h2 text-[#6B4A00] leading-none mb-1">
          124.4 кг
        </span>
        <span className="font-caption-regular text-[#6B4A00]">К раздаче</span>
      </div>
    </div>
  );
};
