import { BaseModal } from "@/shared/ui/BaseModal";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { DateRangeValue, FormDateRange } from "@/shared/ui/Form/FormDateRange";
import { useState } from "react";

export const Vacation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: undefined,
    to: undefined,
  });

  return (
    <>
      <div className="w-full flex justify-center">
        <Button onClick={() => setIsOpen(true)} variant="btn-B-WhiteDefault">
          Выбрать даты
        </Button>
      </div>
      <BaseModal open={isOpen} onOpenChange={setIsOpen} title="Отпуск">
        <div className="h-full flex flex-col justify-between items-center">
          <Card title="Выберите даты отпуска" titleFont="font-bodytext-m">
            <FormDateRange
              label="Даты"
              value={dateRange}
              onChange={setDateRange}
            />
          </Card>
          <Card rounded="none" paddingTop="s" paddingBottom="l">
            <div className="w-full flex justify-center">
              <Button disabled={dateRange.from === undefined && dateRange.to === undefined}>Сохранить</Button>
            </div>
          </Card>
        </div>
      </BaseModal>
    </>
  );
};
