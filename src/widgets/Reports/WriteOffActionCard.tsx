// WriteOffActionCard.tsx
import { ActionCard } from "@/shared/ui/ActionCard";
import { useState } from "react";
import MinusIcon from "~assets/icons/trash.svg?react";
import { WriteOffReportModal } from "./WriteOff/WriteOffReportModal";


export const WriteOffActionCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Тестовые данные для селекта
 
  return (
    <>
     <ActionCard icon={<MinusIcon />} label="Подать отчет о списании" onClick={() => setIsOpen(true)} classNameText="self-center" classNameIcon="mt-0.75" />
     <WriteOffReportModal open={isOpen} onOpenChange={()=> setIsOpen(false)} />
    </>
  );
};
