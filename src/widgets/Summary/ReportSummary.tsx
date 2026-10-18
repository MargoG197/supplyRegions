export const ReportSummary = () => {
  return (
    <div className="flex justify-between -mt-0.5 items-start w-full">
      {/* ЛЕВАЯ ЧАСТЬ: Список данных */}
      <div className="flex flex-col gap-1.5 grow w-full max-w-[38%]">
        <div className="flex justify-between w-full items-center">
          <div className="font-caption-regular text-light-gray-4 dark:text-light-gray-3">
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

      <div className="bg-light-bg-warning-secondary-hover rounded-xs py-3.25 px-3 flex flex-col items-start justify-center">
        <span className="font-headline-h2 h-6.75 text-light-text-warning-default">
          124.4 кг
        </span>
        <span className="font-caption-regular h-5 text-light-text-warning-default">К раздаче</span>
      </div>
    </div>
  );
};
