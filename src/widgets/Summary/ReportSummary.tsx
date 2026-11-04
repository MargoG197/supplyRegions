export const ReportSummary = () => {
  return (
    <div className="flex justify-between items-center w-full">
      {/* ЛЕВАЯ ЧАСТЬ: Список данных */}
      <div className="flex justify-between grow w-full max-w-[48.5%]">
        <div className="font-bodytext-regular gap-1 text-light-gray-5 dark:text-light-gray-4 flex flex-col justify-between items-start ">
          <div>
            Выемки
          </div>
          <span>
            Списания
          </span>
          <span >
            Раздачи
          </span>
        </div>

        <div className="font-bodytext-regular gap-1 text-light-gray-black dark:text-light-gray-white flex flex-col justify-between items-end">
          <div>
            491.1 кг
          </div>
          <span>
            14.2 кг
          </span>
          <span>
            352.5 кг
          </span>
        </div>

      </div>

      <div className="bg-light-bg-warning-secondary-hover rounded-xs p-3 flex flex-col items-start justify-center">
        <span className="font-headline-h2 text-light-text-warning-default">
          124.4 кг
        </span>
        <span className="font-caption-regular tracking-normal text-light-text-warning-default text-left">Осталось<br/> раздать</span>
      </div>
    </div>
  );
};
