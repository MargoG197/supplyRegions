import { PATHS } from "@/paths";
import { ActionCardWithOptions } from "@/shared/ui/ActionCardWithOptions";
import { useNavigate } from "react-router-dom";

export const DistributionReportWidget = () => {
  const navigate = useNavigate();

  const handleGoToReport = () => {
    navigate(PATHS.REPORTS.DISTRIBUTION_REPORT);
  };

  return (
    <>
      <ActionCardWithOptions
        onClick={handleGoToReport}
        label={
          <p>
            Загрузить <br /> ведомость
          </p>
        }
        labelFontSizeOption="font-bodytext-m"
        className="px-3 py-3.75 min-h-13.75 "
      >
        <ul className=" list-disc pl-5.5 text-light-gray-5 font-caption-regular">
          <li>Продуктовые наборы</li>
        </ul>
      </ActionCardWithOptions>
    </>
  );
};
