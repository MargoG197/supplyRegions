import { ActionCard } from "@/shared/ui/ActionCard";
import { BaseModal } from "@/shared/ui/BaseModal";
import { useState } from "react";

export const CuratorDoc = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ActionCard
        label="Инструкция куратора"
        labelFontSizeOption="font-bodytext-regular"
        className="px-3 py-3.75 min-h-13.75"
        onClick={() => setIsOpen(true)}
      />

      <BaseModal
        title="Инструкция куратора"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="h-screen bg-light-gray-white px-4 py-5 font-bodytext-regular">
          <div>
            Добрый день!
          </div>
          <div className="mt-2  ">Просим вас ознакомиться с порядком оказания продуктовой
            помощи благотворительным фондом «Дари еду».</div>
          <div className="mt-2">1. Подача заявки и её обработка.</div>
        </div>
      </BaseModal>
    </>
  );
};
