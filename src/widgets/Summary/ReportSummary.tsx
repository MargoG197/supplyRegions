import { StockInfo } from "@/shared/ui/StockInfo";

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
      <StockInfo weight="124.4" />
    </div>
  );
};
