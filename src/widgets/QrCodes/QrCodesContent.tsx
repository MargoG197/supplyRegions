import { YellowInfoBox } from "@/shared/ui/YellowInfoBox";
import { SmallQr } from "./SmallQr";

interface QrCardData {
  id: string;
  title: string;
  subtitle: string;
  qrValue: string; // Данные, которые зашифрованы в QR
}

// Пример данных (позже будут приходить с бэкенда)
const mockData: QrCardData[] = [
  {
    id: "1",
    title: "Ярославское ш., 54",
    subtitle: "Лента №102 Москва, гипер",
    qrValue: "https://qr.io/",
  },
  {
    id: "2",
    title: "пл. Свободы, д. 2, кор. ч. 1, ТЦ Воскресенский Пассаж",
    subtitle: "Лента №103 МО, Наро-Фоминск, гипер",
    qrValue:
      "https://drive.google.com/file/d/14nNAoUWStuMzUBZGXIwapCbvRh_TfIY2/view",
  },
  {
    id: "3",
    title: "МКАД 47-й км, стр. 1",
    subtitle: "Лента №104 Москва, д. Говорово, гипер",
    qrValue: "Лента №104 Москва, д. Говорово, гипер",
  },
  {
    id: "4",
    title: "ш. Дмитровское, д.163а, кор.1",
    subtitle: "Лента №104 Москва, гипер",
    qrValue: "https://qr.io/",
  },
  //  {
  //   id: "5",
  //   title: "Самара, Московское ш. 4",
  //   subtitle: "Вкусвилл №10 Ярославль, гипер",
  //   qrValue: "Вкусвилл №10 Ярославль, гипер, Моя инфорамация для qr3",
  // },
  // {
  //   id: "6",
  //   title: "Самара, ул. Мира 12",
  //   subtitle: "ВкусВилл №341",
  //   qrValue: "Моя зашифровананя инфорамация qr2",
  // },
];

export const QrCodesContent = () => {
  return (
    <>
      <div className="w-full mx-auto bg-light-gray-white h-[90%]">
        <div className="pt-5 p-4 bg-light-gray-white">
          <YellowInfoBox textSize="caption">
            <div className="text-left">
              {" "}
              Доверенность действует на конкретный магазин. Покажите экран
              администратору вместе с QR. Выставочные образцы – по распоряжению
              КСО Ленты.
            </div>
          </YellowInfoBox>{" "}
          <div className="w-full bg-light-gray-white pt-4">
            {/* Сетка */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {mockData.map((item) => (
                <SmallQr item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
