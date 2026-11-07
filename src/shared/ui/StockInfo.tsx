interface StockInfoProps {
  weight: string;
}

export const StockInfo = ({ weight }: StockInfoProps) => {
  return (
    <div className="bg-light-bg-warning-secondary-hover text-left min-w-25 shrink-0 rounded-xs p-3 flex flex-col items-start justify-center">
      <span className="font-headline-h2 text-light-text-warning-default">
        {weight} кг
      </span>
      <span className="font-caption-regular tracking-normal text-light-text-warning-default text-left">
        Осталось
        <br /> раздать
      </span>
    </div>
  );
};
