import { BaseModal } from "@/shared/ui/BaseModal";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface QrCardData {
  id: string;
  title: string;
  subtitle: string;
  qrValue: string;
}

// Добавляем интерфейс для пропсов
interface FullScreenQrProps {
  item: QrCardData;
}

// Деструктурируем пропс item
export const FullScreenQr = ({ item }: FullScreenQrProps) => {
  const [isOpen, setIsOpen] = useState(false);
//border-gray-200
  return (
    <div className="flex flex-col">
      <Button variant="btn-M-WhiteDefault" onClick={() => setIsOpen(true)}>
        Полный экран
      </Button>
      <BaseModal title={item.subtitle} open={isOpen} onOpenChange={setIsOpen}>
        <div className="w-full mx-auto bg-light-gray-white h-screen flex justify-center">
          <div className="px-18.75 mt-[26.5%]">
            <div className="flex flex-col justify-center items-center">
              <div className="pb-4 font-bodytext-m">{item.title}</div>
              <div className="w-full aspect-square rounded-lg p-2 mb-2 flex items-center justify-center">
                <QRCodeSVG
                  value={item.qrValue}
                  size={256}
                  className="w-full h-full"
                  level="L"
                />
              </div>
            </div>
          </div>
        </div>
        <Card
          rounded="none"
          paddingTop="s"
          paddingBottom="l"
          className="border-t-[0.33px] "
        >
          <div className="w-full flex justify-center">
            <Button variant="btn-B-GreenDefault-lg">
              Перейти в отчет по выемке
            </Button>
          </div>
        </Card>
      </BaseModal>
    </div>
  );
};
