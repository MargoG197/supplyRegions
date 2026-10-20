// WriteOffActionCard.tsx
import { ActionCard } from "@/shared/ui/ActionCard";
import { useState } from "react";
import MinusIcon from "~assets/icons/minus.svg?react";
import { WriteOffReportModal } from "./WriteOff/WriteOffReportModal";


export const WriteOffActionCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Тестовые данные для селекта
 
  return (
    <>
     <ActionCard icon={<MinusIcon />} label="Подать отчет о списании" onClick={() => setIsOpen(true)} />
     <WriteOffReportModal open={isOpen} onOpenChange={()=> setIsOpen(false)} />
    </>
  );
};
