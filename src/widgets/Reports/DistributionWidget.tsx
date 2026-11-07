import { PATHS } from "@/paths";
import { ActionCard } from "@/shared/ui/ActionCard";
import ArrowRightIcon from "~assets/icons/arrowCircle.svg?react";
import { useNavigate } from "react-router-dom";

// interface DistributionReportProps {
//   mainScreen: boolean;
// }

export const DistributionWidget = () => {
  const navigate = useNavigate();

  const handleGoToReport = () => {
    navigate(PATHS.REPORTS.DISTRIBUTION);
  };

  return (
    <>
      <ActionCard
        onClick={handleGoToReport}
        icon={<ArrowRightIcon />}
        label="Подать отчет о раздаче"
        classNameIcon="mt-1.25 mr-0.75"
      />
    </>
  );
};
