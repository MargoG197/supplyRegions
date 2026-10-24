// WriteOffReportModal.tsx
import { formatDateInput } from "@/lib/formatDate";
import { BaseModal } from "@/shared/ui/BaseModal";
import { Button } from "@/shared/ui/Button";
import { AttachedPhoto } from "@/shared/ui/Form/AttachedPhoto";
import { FormFileUpload } from "@/shared/ui/Form/FormFileUpload";
import { FormInput } from "@/shared/ui/Form/FormInput";
import { SuccessPopup } from "@/shared/ui/SuccessPopup";
import { useState } from "react";
import { WriteOff } from "./WriteOff";
import { mergePhotos } from "@/shared/utils/helperFunctions";

interface WriteOffReportModalProps {
  /** Открыто ли окно */
  open: boolean;
  /** Колбэк изменения состояния окна */
  onOpenChange: ()=>void;
}

export const WriteOffReportModal = ({ 
  open, 
  onOpenChange, 
}: WriteOffReportModalProps) => {
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  // Тестовые данные для селекта
 
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
         <BaseModal
        title="Подать отчет о списании"
        open={open}
        onOpenChange={onOpenChange}
      >
        <div className="bg-light-gray-white p-4 flex flex-col gap-4 overflow-y-auto h-screen">
           <div className="flex flex-col gap-3 mt-1 mb-3.5 w-full">
          {/* Дата (Инпут с маской) */}
          <FormInput
            label="Дата"
            placeholder="ДД.ММ.ГГГГ"
            value={date}
            onChange={(e) => setDate(formatDateInput(e.target.value))}
            // hint="Корректный формат ДД.ММ.ГГГГ"
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
          <WriteOff />
          {/* <FormFileUpload
            label="Акт (скан, 1 файл)"
            buttonText="Прикрепить акт"
            mode="document"
            onFilesSelect={(files) => setActFile(files[0] || null)}
          /> */}
          {/* {actFile && (
            <AttachedFile
              fileName={actFile?.name}
              onRemove={() => setActFile(null)}
            />
          )} */}
          {/* Фото (картинки, включая HEIC с iPhone) */}
          <FormFileUpload
            label={
              <>
                Фото (до 3-х штук){" "}
                {/* <span className="text-light-error-red">необязательно</span>) */}
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
        </div>
       
      </BaseModal>
      <SuccessPopup
        title="Отчёт о списании подан"
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        shouldAutoClose={true}
      />
    </>
  );
};
