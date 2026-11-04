import { formatDateInput } from "@/lib/formatDate";
import { Button } from "@/shared/ui/Button";
import { AttachedFile } from "@/shared/ui/Form/AttachedFile";
import { AttachedPhoto } from "@/shared/ui/Form/AttachedPhoto";
import { FormFileUpload } from "@/shared/ui/Form/FormFileUpload";
import { FormInput } from "@/shared/ui/Form/FormInput";
import { FormSelect } from "@/shared/ui/Form/FormSelect";
import { SuccessPopup } from "@/shared/ui/SuccessPopup";
import { useState } from "react";
import { mergePhotos } from "@/shared/utils/helperFunctions";
import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/paths";
import { Card } from "@/shared/ui/Card";
import paper from "@/assets/paper.jpg";

export const WithdrawalReport = () => {
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [actFile, setActFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  // Тестовые данные для селекта
  const mockStores = [
    {
      value: "102",
      label: "Ярославское ш., 54",
      description: "Лента №102 Москва, гипер",
    },
    {
      value: "103",
      label: "пл. Свободы, д. 2, кор. ч. 1, ТЦ Воскресеymz jhfjh",
      description: "Лента №103 МО, Наро-Фоминск, гипер",
    },
    {
      value: "104",
      label: "МКАД 47-й км, стр. 1",
      description: "Лента №104 Москва, д. Говорово, гипер",
    },
    {
      value: "105",
      label: "ш. Дмитровское, д.163а, кор.1",
      description: "Лента №105 Москва, гипер",
    },
    {
      value: "106",
      label: "7-я Кожуховская улица, 9",
      description: "Лента №106 Москва, гипер",
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

  const navigate = useNavigate();

  const handleGoToReport = () => {
    navigate(PATHS.REPORTS.WRITE_OFF);
  };

  return (
    <>
      <TabPageLayout title="Подать отчет о выемке">
        <div className="px-4 py-5 h-[80%] overflow-y-scroll flex flex-col bg-light-gray-white rounded-m">
          <div className="flex flex-col gap-4 w-full ">
            {/* Адрес (Селект) */}
            <FormSelect
              label="Адрес магазина"
              placeholder="Выберите магазин"
              options={mockStores}
              value={address}
              onChange={(val) => setAddress(val)}
              // hint={
              //   address
              //     ? undefined
              //     : "Здесь появится номер магазина после выбора адреса"
              // }
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

            <div className="flex flex-col gap-2">
              <FormFileUpload
                label="Акт (1 файл)"
                buttonText="Прикрепить акт"
                mode="document"
                onFilesSelect={(files) => setActFile(files[0] || null)}
                gap={"mr-3.5"}
              />
              {actFile && (
                <AttachedFile onRemove={() => setActFile(null)} src={paper} />
              )}
            </div>
  
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
        </div>

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
        title="Отчёт о выемке подан"
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onOk={() => setIsSuccessOpen(false)}
        onWriteOff={() => {
          setIsSuccessOpen(false);
          handleGoToReport();
        }}
      />
    </>
  );
};
