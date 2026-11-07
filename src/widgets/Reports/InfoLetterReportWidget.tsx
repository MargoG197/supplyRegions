import { PATHS } from "@/paths";
import { ActionCardWithOptions } from "@/shared/ui/ActionCardWithOptions";
import { useNavigate } from "react-router-dom";

// interface DistributionReportProps {
//   mainScreen: boolean;
// }

export const InfoLetterReportWidget = () => {
  const navigate = useNavigate();

  const handleGoToReport = () => {
    navigate(PATHS.REPORTS.INFO_LETTER_REPORT);
  };

  return (
    <>
      <ActionCardWithOptions
        onClick={handleGoToReport}
        label={
          <p>
            Отправить <br /> инфописьмо
          </p>
        }
        labelFontSizeOption="font-bodytext-m"
        className="px-3 py-3.75 min-h-13.75 "
      >
        <ul className="list-disc pl-5.5 text-light-gray-5 font-caption-regular">
          <li>Вода</li>
          <li>Горячие обеды</li>
        </ul>
      </ActionCardWithOptions>
    </>
  );
};
