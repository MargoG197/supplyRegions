import { useState } from "react";
import { mergePhotos } from "@/shared/utils/helperFunctions";
import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
import { YellowInfoBox } from "@/shared/ui/YellowInfoBox";
import { FormInput } from "@/shared/ui/Form/FormInput";
import { formatDateInput } from "@/lib/formatDate";
import { StockInfo } from "@/shared/ui/StockInfo";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { FormFileUpload } from "@/shared/ui/Form/FormFileUpload";
import { AttachedPhoto } from "@/shared/ui/Form/AttachedPhoto";
import { AttachedFile } from "@/shared/ui/Form/AttachedFile";
import paper from "@/assets/paper.jpg";
import { PATHS } from "@/paths";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";


export const InfoLetterReport = () => {
  const [numberOfSets] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [actFile, setActFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false)

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = () => {
    // setIsOpen(false);
    // setIsSuccessOpen(true);
setIsOpenSuccess(true)
  };
    const navigate = useNavigate();

  const handleGoToTheMainPage = () => {
    navigate(PATHS.CURATOR.MAIN);
  };

  const handleFilesSelect = (files: File[]) => {
    setPhotos((prev) => mergePhotos(prev, files, 3));
  };

  return (
    <>
      <TabPageLayout title="Подать отчет о раздаче">
        <div className="h-[83%] overflow-y-scroll flex flex-col gap-1">
          <div className="px-4 py-5 flex flex-col gap-4 w-full bg-light-gray-white rounded-m">
            {/* {showInfo && (
              <YellowInfoBox
                className="text-left "
                onClose={() => setShowInfo(false)}
              >
                <p className="tracking-normal">
                  Если ваша раздача длилась несколько дней, укажите последний
                  день раздачи
                </p>
              </YellowInfoBox>
            )} */}
            <FormInput
              label="Дата раздачи"
              placeholder="ДД.ММ.ГГГГ"
              value={date}
              onChange={(e) => setDate(formatDateInput(e.target.value))}
              hint="Корректный формат ДД.ММ.ГГГГ"
              inputMode="numeric"
              mode="date"
            />
            <div className="flex gap-3">
              <StockInfo weight="124.4" />
              <FormInput
                label="Вес, кг"
                placeholder="0.00"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                hint="Например, 120.5"
                mode="weight"
                step="0.1"
              />
            </div>
            <div className="flex flex-col text-start gap-1.5">
              <YellowInfoBox
              className="text-left "
            >
              <div>
                {" "}
                <div className="font-headline-h2">{numberOfSets || "—"} шт</div>
                <p className="tracking-normal">Фактическое число наборов</p>
              </div>
            </YellowInfoBox>
            <p className="font-caption-regular text-light-error-red ">Считается автоматически</p></div>
           
            
            <div className="flex flex-col gap-3">
              <FormFileUpload
                label="Инфописьмо (1 файл)"
                buttonText="Прикрепить инфописьмо"
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
              label={<>Фото (до 3-х штук, необязательно)</>}
              buttonText="Прикрепить фото"
              mode="image"
              onFilesSelect={handleFilesSelect}
              gap={"mr-3"}
            />
            {photos.length > 0 && (
              <div className="flex gap-2 flex-wrap">
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
          </div>
        
        <Card
          rounded="none"
          paddingTop="s"
          className="h-fit absolute bottom-0"
          paddingBottom="none"
        >
          <div className="w-full flex flex-col justify-center">
            <Button onClick={handleSubmit} variant="btn-B-GreenDefault-lg">
              Подать отчёт о раздаче
            </Button>{" "}
            <p className="font-caption-regular text-center text-light-gray-5 mt-4 px-2">
              Редактирование доступно 2 недели после отправки в списке отчетов
            </p>
          </div>
        </Card>
        <ConfirmModal
        isOpen={isOpenSuccess}
        onOpenChange={setIsOpenSuccess}
        onConfirm={() => {
          setIsOpenSuccess(false);
          handleGoToTheMainPage()
        }}
        title="Отчёт о раздаче подан"
        subtitle="Редактирование доступно 2 недели после отправки в списке отчетов"
        confirmBtnText="На главную"
        isSingleBtn={true}
      />
      </TabPageLayout>
    </>
  );
};
