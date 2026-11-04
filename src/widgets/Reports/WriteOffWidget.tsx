// WriteOffActionCard.tsx
import { PATHS } from "@/paths";
import { ActionCard } from "@/shared/ui/ActionCard";
import { useNavigate } from "react-router-dom";
import MinusIcon from "~assets/icons/trash.svg?react";


export const WriteOffWidget = () => {
  const navigate = useNavigate(); 

  const handleGoToReport = () => {
    navigate(PATHS.REPORTS.WRITE_OFF); 
  };
 
  return (
     <ActionCard icon={<MinusIcon />} label="Подать отчет о списании" onClick={handleGoToReport} classNameText="self-center" classNameIcon="mt-0.75" />
  );
};
