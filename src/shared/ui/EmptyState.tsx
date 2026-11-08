import classNames from "classnames";
import EmptyIcon from "~assets/icons/bread_logo.svg?react";
import { Button } from "@/shared/ui/Button";

interface EmptyStateProps {
  /** Текст под иконкой */
  title?: string;
  /** Колбэк при клике на кнопку (обычно закрытие модалки/возврат) */
  onBack: () => void;
  className?: string;
}

export const EmptyState = ({
  title = "Здесь будут заявки",
  onBack,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={classNames(
        "w-full h-full flex flex-col items-center gap-4.5 px-4 bg-light-gray-white",
        className,
      )}
    >
      <div className="flex flex-col mt-[60%] items-center text-center">
        <EmptyIcon
          aria-hidden="true"
          className=" text-light-gray-black dark:text-light-gray-white"
        />
        <h2 className="font-headline-h2 pt-1 text-light-gray-black dark:text-light-gray-white">
          {title}
        </h2>
      </div>

      <Button
        variant="btn-S-GreenDefault"
        onClick={onBack}
        className="w-full max-w-39.75"
      >
        Назад
      </Button>
    </div>
  );
};