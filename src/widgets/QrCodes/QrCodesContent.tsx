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
    title: "Николая Островского, 146А",
    subtitle: "Лента №102 Самара, гипер",
    qrValue: "https://qr.io/",
  },
  {
    id: "2",
    title: "Николая Островского, 146А",
    subtitle: "Лента №104 Томск, магнит",
    qrValue: "Лента №104 Томск, магнит 1, разрешение на куратор",
  },
  {
    id: "3",
    title: "Самара, Московское ш. 4",
    subtitle: "Лента №10 Ярославль",
    qrValue: "Вкусвилл №10 Ярославль, гипер, Моя инфорамация для qr3",
  },
  {
    id: "4",
    title: "Самара, ул. Мира 12",
    subtitle: "ВкусВилл №341",
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
          <YellowInfoBox textSize="label">
            <div className="text-left">  Доверенность действует на конкретный магазин. Покажите экран
            администратору вместе с QR. Выставочные образцы — по распоряжению
            КСО Ленты.</div>
          
          </YellowInfoBox>{" "}
          <div className="w-full bg-light-gray-white pt-3">
            {/* Сетка */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4.5">
              {mockData.map((item) => (
                <SmallQr item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
