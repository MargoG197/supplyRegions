import { PATHS } from "@/paths";
import { ActionCard } from "@/shared/ui/ActionCard";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import PlusIcon from "~assets/icons/plus.svg?react";

interface WithdrawalReportProps {
  mainScreen: boolean;
}

export const WithdrawalReportWidget = ({
  mainScreen,
}: WithdrawalReportProps) => {
  const navigate = useNavigate(); 

  const handleGoToReport = () => {
    navigate(PATHS.REPORTS.WITHDRAWAL); 
  };

  return (
    <>
      {mainScreen ? (
        <ActionCard
          onClick={handleGoToReport}
          icon={<PlusIcon />}
          label="Подать отчет о выемке"
          classNameIcon="mt-1.25"
        />
      ) : (
        <Button variant="btn-B-GreenDefault-lg" onClick={handleGoToReport}>
          Перейти в отчет по выемке
        </Button>
      )}
    </>
  );
};