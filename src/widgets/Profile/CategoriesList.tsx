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
      <Card rounded="xs" paddingBottom="l" paddingTop="l"
        title="Категории благополучателей"
        titleFont="font-bodytext-m"
        titleGap="none"
      >
        <p className="text-light-gray-4 font-caption-regular mb-3.25">
          Кому помогает ваша организация
        </p>
        <div className="flex flex-col gap-2 mb-1.5">
          <Chip label="Многодетные семьи" />
          <Chip label="Родители-одиночки" />
          <Chip label="Семьи с детьми-инвалидами" />

          {/* <p className="text-light-gray-black  dark:text-light-gray-white font-label-regular"> */}
            <Chip label="+9 категорий" bgColor="bg-none" />
          {/* </p> */}
        </div>
        <div className="mb-2 w-full flex justify-center">
          <Button variant="btn-B-WhiteDefault-lg" onClick={() => setIsOpen(true)}>
            Открыть весь список
          </Button>
        </div>
      </Card>
      <BaseModal
        title="Категории благополучателей"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Card  paddingBottom="l" paddingTop="l"  title="Кому помогает ваша организация" titleFont="font-caption-regular" titleColor='secondary'  className="max-h-screen overflow-hidden">
            <div className="flex flex-col gap-2 overflow-scroll max-h-[82vh]">
              {categories.map((category) => (
                <ActionCard id={category} key={category} label={category} labelFontSizeOption="font-bodytext-regular" labelFontTrackingOption="tracking-normal" className="px-3 py-3.75" />
              ))}
            </div>
        </Card>
      </BaseModal>
    </>
  );
};
