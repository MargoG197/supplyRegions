import { QRCodeSVG } from "qrcode.react";
import { FullScreenQr } from "./FullScreenQr";

interface QrCardData {
  id: string;
  title: string;
  subtitle: string;
  qrValue: string;
}

// Добавляем интерфейс для пропсов
interface SmallQrProps {
  item: QrCardData;
}

// Деструктурируем пропс item
export const SmallQr = ({ item }: SmallQrProps) => {
  
  return (
    <div className="flex flex-col"> 
      {/* Контейнер для QR-кода */}
      <div className="w-full aspect-square border border-gray-200 rounded-lg flex items-center justify-center">
        <QRCodeSVG
          value={item.qrValue}
          size={141}
          className="w-full h-39.25"
          level="L"
        />
      </div>

      {/* Текстовая информация */}
      <div className="flex flex-col mb-1.75 grow">
        <div className="h-fit font-caption-regular text-light-gray-black dark:text-light-gray-1 flex text-wrap text-left">
          {item.title}
        </div>
        <p className="font-label-regular text-light-gray-5 dark:text-light-gray-4 flex text-wrap text-left">
          {item.subtitle}
        </p>
      </div>
      <FullScreenQr item={item} />
    </div>
  );
};