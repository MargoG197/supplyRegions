// WriteOffReportModal.tsx
import { formatDateInput } from "@/lib/formatDate";
import { Button } from "@/shared/ui/Button";
import { AttachedPhoto } from "@/shared/ui/Form/AttachedPhoto";
import { FormFileUpload } from "@/shared/ui/Form/FormFileUpload";
import { FormInput } from "@/shared/ui/Form/FormInput";
import { SuccessPopup } from "@/shared/ui/SuccessPopup";
import { useState } from "react";
import { WriteOff } from "@/widgets/Reports/WriteOff/WriteOff";
import { mergePhotos } from "@/shared/utils/helperFunctions";
import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
import { Card } from "@/shared/ui/Card";

export const WriteOffReport = () => {
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
      <TabPageLayout title="Подать отчет о списании">
        {/* <div className="w-full mx-auto bg-light-gray-white min-h-full"> */}
          <div className="px-4 py-4 h-[80%] overflow-y-scroll flex flex-col bg-light-gray-white gap-4 rounded-m">
            <div className="flex flex-col gap-4 mt-1 mb-3.5 w-full">
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
                    Фото (до 3-х штук, необязательно){" "}
                  </>
                }
                buttonText="Прикрепить фото"
                mode="image"
                onFilesSelect={handleFilesSelect}
                gap={"mr-3"}
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
            {/* <div className="w-full flex flex-col items-center">
              <Button onClick={handleSubmit} variant="btn-B-GreenDefault-lg">
                Отправить отчет
              </Button>
              <p className="font-caption-regular text-center text-light-gray-5 mt-4">
                Редактирование доступно 2 недели после отправки в списке отчетов
              </p>
            </div> */}
          </div>
        {/* </div> */}
        <Card
          rounded="none"
          paddingTop="s"
          className="h-fit absolute bottom-0" //border-t-[0.33px]
          paddingBottom="none"
        >
          <div className="w-full flex flex-col justify-center">
            <Button onClick={handleSubmit} variant="btn-B-GreenDefault-lg">
              Отправить отчет
            </Button>{" "}
            <p className="font-caption-regular text-center text-light-gray-5 mt-4 px-2">
              Редактирование доступно 2 недели после отправки в списке отчетов
            </p>
          </div>
        </Card>
      </TabPageLayout>
      <SuccessPopup
        title="Отчёт о списании подан"
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        shouldAutoClose={true}
      />
    </>
  );
};
