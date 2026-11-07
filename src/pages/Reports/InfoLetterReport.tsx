// import { useState } from "react";
// import { mergePhotos } from "@/shared/utils/helperFunctions";
// import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
// import { useNavigate } from "react-router-dom";
// import { PATHS } from "@/paths";
// import { Card } from "@/shared/ui/Card";
// import { ActionCard } from "@/shared/ui/ActionCard";

// export const InfoLetterReport = () => {
//   const [address, setAddress] = useState("");
//   const [date, setDate] = useState("");
//   const [weight, setWeight] = useState("");
//   const [actFile, setActFile] = useState<File | null>(null);
//   const [photos, setPhotos] = useState<File[]>([]);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   // Тестовые данные для селекта
//   const mockStores = [
//     {
//       value: "102",
//       label: "Ярославское ш., 54",
//       description: "Лента №102 Москва, гипер",
//     },
//     {
//       value: "103",
//       label: "пл. Свободы, д. 2, кор. ч. 1, ТЦ Воскресеymz jhfjh",
//       description: "Лента №103 МО, Наро-Фоминск, гипер",
//     },
//     {
//       value: "104",
//       label: "МКАД 47-й км, стр. 1",
//       description: "Лента №104 Москва, д. Говорово, гипер",
//     },
//     {
//       value: "105",
//       label: "ш. Дмитровское, д.163а, кор.1",
//       description: "Лента №105 Москва, гипер",
//     },
//     {
//       value: "106",
//       label: "7-я Кожуховская улица, 9",
//       description: "Лента №106 Москва, гипер",
//     },
//     {
//       value: "7",
//       label: "Николая Островского, 150",
//       description: "Лента №105",
//     },
//     { value: "8", label: "Победы, 14", description: "Магнит №102" },
//     {
//       value: "9",
//       label: "Николая Островского, 152",
//       description: "Лента №106",
//     },
//   ];

//   const removePhoto = (index: number) => {
//     setPhotos((prev) => prev.filter((_, i) => i !== index));
//   };
//   const handleSubmit = () => {
//     // setIsOpen(false);
//     setIsSuccessOpen(true);
//   };

//   const handleFilesSelect = (files: File[]) => {
//     setPhotos((prev) => mergePhotos(prev, files));
//   };

//   const navigate = useNavigate();

//   const handleGoToReport = () => {
//     navigate(PATHS.REPORTS.WRITE_OFF);
//   };

//   return (
//     <>
//       <TabPageLayout title="Отправить инфо письмо">
//         <Card paddingBottom="l" paddingTop="l">
//           <div className="flex gap-4">
//             <ActionCard
//               label={
//                 <p>
//                   Загрузить <br /> ведомость
//                 </p>
//               }
//               labelFontSizeOption="font-bodytext-m"
//               className="px-3 py-3.75 min-h-13.75 "
//               //  onClick={() => setIsOpen(true)}
//             >
//               <ul className=" list-disc pl-5.5 text-light-gray-5 font-caption-regular">
//                 <li>Продуктовые наборы</li>
//               </ul>
//             </ActionCard>
//             <ActionCard
//               label={
//                 <p>
//                   Отправить <br /> инфописьмо
//                 </p>
//               }
//               labelFontSizeOption="font-bodytext-m"
//               className="px-3 py-3.75 min-h-13.75 "
//               // onClick={() => setIsOpen(true)}
//             >
//               <ul className="list-disc pl-5.5 text-light-gray-5 font-caption-regular">
//                 <li>Вода</li>
//                 <li>Горячие обеды</li>
//               </ul>
//             </ActionCard>
//           </div>
//         </Card>
//       </TabPageLayout>
//     </>
//   );
// };
