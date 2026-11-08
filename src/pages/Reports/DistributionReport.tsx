import { useState } from "react";
import { mergePhotos } from "@/shared/utils/helperFunctions";
import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
// import { useNavigate } from "react-router-dom";
// import { PATHS } from "@/paths";
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
import { DariEduRequestsWidget } from "@/widgets/Requests/DariEduRequestsWidget";
import { RequestItem } from "@/shared/types/constants";
// import { RequestStatusBaseCard } from "@/shared/ui/Form/RequestStatusBaseCard";


export const DistributionReport = () => {
  const [numberOfSets, setNumberOfSets] = useState("");
  const [numberOfFamilyMembers, setNumberOfFamilyMembers] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [actFile, setActFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [showInfo, setShowInfo] = useState(true);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  // const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  // // Тестовые данные для селекта
  // const mockStores = [
  //   {
  //     value: "102",
  //     label: "Ярославское ш., 54",
  //     description: "Лента №102 Москва, гипер",
  //   },
  //   {
  //     value: "103",
  //     label: "пл. Свободы, д. 2, кор. ч. 1, ТЦ Воскресеymz jhfjh",
  //     description: "Лента №103 МО, Наро-Фоминск, гипер",
  //   },
  //   {
  //     value: "104",
  //     label: "МКАД 47-й км, стр. 1",
  //     description: "Лента №104 Москва, д. Говорово, гипер",
  //   },
  //   {
  //     value: "105",
  //     label: "ш. Дмитровское, д.163а, кор.1",
  //     description: "Лента №105 Москва, гипер",
  //   },
  //   {
  //     value: "106",
  //     label: "7-я Кожуховская улица, 9",
  //     description: "Лента №106 Москва, гипер",
  //   },
  //   {
  //     value: "7",
  //     label: "Николая Островского, 150",
  //     description: "Лента №105",
  //   },
  //   { value: "8", label: "Победы, 14", description: "Магнит №102" },
  //   {
  //     value: "9",
  //     label: "Николая Островского, 152",
  //     description: "Лента №106",
  //   },
  // ];
  console.log(requests, 'requests ')

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = () => {
    // setIsOpen(false);
    // setIsSuccessOpen(true);
  };

  const handleFilesSelect = (files: File[]) => {
    setPhotos((prev) => mergePhotos(prev, files, 9));
  };

  // const navigate = useNavigate();

  // const handleGoToReport = () => {
  //   navigate(PATHS.REPORTS.WRITE_OFF);
  // };

  return (
    <>
      <TabPageLayout title="Подать отчет о раздаче">
        <div className="h-[81%] overflow-y-scroll flex flex-col gap-1">
          {/* <Card> */}
          <div className="px-4 py-5 flex flex-col gap-3 w-full bg-light-gray-white rounded-m">
            {showInfo && (
              <YellowInfoBox
                className="text-left "
                onClose={() => setShowInfo(false)}
              >
                <p className="tracking-normal">
                  Если ваша раздача длилась несколько дней, укажите последний
                  день раздачи
                </p>
              </YellowInfoBox>
            )}
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
            <FormInput
              label="Общее число наборов, шт"
              placeholder="0"
              value={numberOfSets}
              onChange={(e) => setNumberOfSets(e.target.value)}
              hint="Например, 22"
              mode="integer"
              step="1"
            />
          </div>
          {/* </Card> */}
          <div className="px-4 py-5 flex flex-col gap-3 w-full bg-light-gray-white rounded-m">
            <FormInput
              label="Общее количество человек по ведомости"
              placeholder="0"
              value={numberOfFamilyMembers}
              onChange={(e) => setNumberOfFamilyMembers(e.target.value)}
              hint="Например, 36"
              mode="integer"
              step="1"
            />
            <DariEduRequestsWidget onSave={(cards: RequestItem[]) => {
              setRequests(cards)
            }}/>
          </div>
          <div className="px-4 py-5 flex flex-col gap-3 w-full bg-light-gray-white rounded-m">
            <div className="flex flex-col gap-3">
              <FormFileUpload
                label="Ведомость (1 файл)"
                buttonText="Прикрепить ведомость"
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
              label={<>Фото (до 9-х штук)</>}
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
      </TabPageLayout>
    </>
  );
};
