// WithdrawalReportModal.tsx
import { formatDateInput } from "@/lib/formatDate";
import { ActionCard } from "@/shared/ui/ActionCard";
import { BaseModal } from "@/shared/ui/BaseModal";
import { Button } from "@/shared/ui/Button";
import { AttachedFile } from "@/shared/ui/Form/AttachedFile";
import { AttachedPhoto } from "@/shared/ui/Form/AttachedPhoto";
import { FormFileUpload } from "@/shared/ui/Form/FormFileUpload";
import { FormInput } from "@/shared/ui/Form/FormInput";
import { FormSelect } from "@/shared/ui/Form/FormSelect";
import { SuccessPopup } from "@/shared/ui/SuccessPopup";
import { useState } from "react";
import PlusIcon from "~assets/icons/plus.svg?react";
import { WriteOffReportModal } from "./WriteOff/WriteOffReportModal";
import { mergePhotos } from "@/shared/utils/helperFunctions";

export const WithdrawalReportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [actFile, setActFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isOpenWriteOffReport, setIsOpenWriteOffReport] = useState(false);
  // Тестовые данные для селекта
  const mockStores = [
    {
      value: "1",
      label: "Николая Островского, 146А",
      description: "Лента №101",
    },
    { value: "2", label: "Победы, 10", description: "Магнит №100" },
    {
      value: "3",
      label: "Николая Островского, 147А",
      description: "Лента №102",
    },
    {
      value: "4",
      label: "Николая Островского, 148А",
      description: "Лента №103",
    },
    { value: "5", label: "Победы, 11", description: "Магнит №101" },
    {
      value: "6",
      label: "Николая Островского, 149",
      description: "Лента №104",
    },
    {
      value: "7",
      label: "Николая Островского, 150",
      description: "Лента №105",
    },
    { value: "8", label: "Победы, 14", description: "Магнит №102" },
    {
      value: "9",
      label: "Николая Островского, 152",
      description: "Лента №106",
    },
  ];

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = () => {
    // setIsOpen(false);
    setIsSuccessOpen(true);
  };

    const handleFilesSelect = (files: File[]) => {
      setPhotos((prev) => mergePhotos(prev, files));
    };
  return (
    <>
      <ActionCard
        onClick={() => setIsOpen(true)}
        icon={<PlusIcon />}
        label="Подать отчет о выемке"
      />
      <BaseModal
        title="Подать отчет о выемке"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex flex-col gap-3 mt-1 mb-13.5 w-full">
          {/* Адрес (Селект) */}
          <FormSelect
            label="Адрес магазина"
            placeholder="Выберите магазин"
            options={mockStores}
            value={address}
            onChange={(val) => setAddress(val)}
            hint={
              address
                ? undefined
                : "Здесь появится номер магазина после выбора адреса"
            }
          />
          {/* Дата (Инпут с маской) */}
          <FormInput
            label="Дата"
            placeholder="ДД.ММ.ГГГГ"
            value={date}
            onChange={(e) => setDate(formatDateInput(e.target.value))}
            hint="Корректный формат ДД.ММ.ГГГГ"
            inputMode="numeric"
            mode="date"
          />
          {/* Вес (Инпут) */}
          <FormInput
            label="Вес, кг"
            placeholder="0.00"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            hint="Например, 26.8"
            mode="weight"
            step="0.1"
          />
          <FormFileUpload
            label="Акт (скан, 1 файл)"
            buttonText="Прикрепить акт"
            mode="document"
            onFilesSelect={(files) => setActFile(files[0] || null)}
          />
          {actFile && (
            <AttachedFile
              fileName={actFile?.name}
              onRemove={() => setActFile(null)}
            />
          )}
          {/* Фото (картинки, включая HEIC с iPhone) */}
          <FormFileUpload
            label={
              <>
                Фото (до 3-х штук,{" "}
                <span className="text-light-error-red">необязательно</span>)
              </>
            }
            buttonText="Прикрепить фото"
            mode="image"
            onFilesSelect={handleFilesSelect}
          />
          {photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <AttachedPhoto
                  key={`${photo.name}-${index}`}
                  file={photo}
                  onRemove={() => removePhoto(index)}
                />
              ))}
            </div>
          )}
        </div>
        {/* 2. Кастомный футер. 
          Он находится внутри скроллируемого контейнера, 
          поэтому если форма будет длинной, кнопка будет в самом низу. 
          Если нужно, чтобы кнопка была всегда прижата к низу экрана (не скроллилась), 
          скажите — мы вынесем её за пределы div с overflow-y-auto. */}
        <div className="w-full flex flex-col items-center">
          <Button onClick={handleSubmit} variant="btn-B-GreenDefault-lg">
            Отправить отчет
          </Button>
          <p className="font-caption-regular text-center text-light-gray-5 mt-4">
            Редактирование доступно 2 недели после отправки в списке отчетов
          </p>
        </div>
      </BaseModal>
      <SuccessPopup
        title="Отчёт о выемке подан"
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onOk={() => setIsSuccessOpen(false)}
        onWriteOff={() => {
          setIsSuccessOpen(false)
          setIsOpenWriteOffReport(true)
        }}
      />
      <WriteOffReportModal open={isOpenWriteOffReport} onOpenChange={()=>{setIsOpen(false); setIsOpenWriteOffReport(false); }} />
    </>
  );
};
