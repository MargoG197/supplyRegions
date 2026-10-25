import { ActionCard } from "@/shared/ui/ActionCard";
import { BaseModal } from "@/shared/ui/BaseModal";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Chip } from "@/shared/ui/Chip";
import { useState } from "react";

const categories = [
  "Многодетные семьи",
  "Родители-одиночки",
  "Семьи с детьми-инвалидами",
  "Приемные семьи и родители опекуны",
  "Погорельцы",
  "Инвалиды I, II, III группы",
  "Пенсионеры",
  "Малообеспеченные семьи (малоимущие) и граждане",
  "Семьи мобилизованных",
  "Беженцы",
  "Вынужденные переселенцы (общая категория)",
  "Люди пострадавшие в режиме ЧС",
];
export const CategoriesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card
        title="Категории благополучателей"
        titleFont="font-bodytext-m"
        titleGap="xs"
      >
        <p className="text-light-gray-4 font-caption-regular mb-2.75">
          Кому помогает ваша организация
        </p>
        <div className="flex flex-col gap-2.5 mb-3.5">
          <Chip label="Многодетные семьи" />
          <Chip label="Родители-одиночки" />
          <Chip label="Семьи с детьми-инвалидами" />
          <p className="text-light-gray-black ml-3 dark:text-light-gray-white font-label-regular">
            +9 категорий
          </p>
        </div>
        <div className="mb-2 w-full flex justify-center">
          <Button variant="btn-B-WhiteDefault" onClick={() => setIsOpen(true)}>
            Открыть весь список
          </Button>
        </div>
      </Card>
      <BaseModal
        title="Категории благополучателей"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Card title="Кому помогает ваша организация" titleFont="font-bodytext-m" className="max-h-screen overflow-hidden">
            <div className="flex flex-col gap-2 overflow-scroll max-h-[82vh]">
              {categories.map((category) => (
                <ActionCard id={category} label={category} labelFontSizeOption="font-bodytext-regular" labelFontTrackingOption="tracking-normal" className="px-3 py-3.75" />
              ))}
            </div>
        </Card>
      </BaseModal>
    </>
  );
};
