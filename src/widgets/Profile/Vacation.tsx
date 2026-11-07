import { BaseModal } from "@/shared/ui/BaseModal";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { DateRangeValue, FormDateRange } from "@/shared/ui/Form/FormDateRange";
import { YellowInfoBox } from "@/shared/ui/YellowInfoBox";
import { useState } from "react";

export const Vacation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasVacation, setHasVacation] = useState(true)
  const [vacationInProcess, setVacationInProcess] = useState(true)

  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: undefined,
    to: undefined,
  });

  return (
    <>
      <Card rounded="xs" paddingBottom="l" paddingTop="l" title="Отпуск" titleFont="font-bodytext-m" titleGap="none">
        <div className="flex flex-col gap-1.5">
          {hasVacation ? (
            <YellowInfoBox fontColour="text-light-text-warning-default" className="mt-1">
              <p className="mt-px tracking-normal ">С 12 по 18 октября 2026 включительно <br/> Вернётесь к работе 19 октября</p>
            </YellowInfoBox>
          ) : (
            <p className="text-light-gray-4 font-caption-regular">
              Уточните даты отпуска
            </p>
          )}

          {vacationInProcess ? (
            <div className="w-full flex gap-2 justify-center">
              <Button
                onClick={() => setIsOpen(true)}
                variant="btn-M-WhiteDefault"
              >
               Изменить
                </Button>
                 <Button
                onClick={() => { setHasVacation(false); setVacationInProcess(false) }}
                variant="btn-M-GreenDefault"
              >
               Завершить
              </Button>
            </div>
          ) : (
             <div className="w-full flex justify-center">
              <Button
                onClick={() => setIsOpen(true)}
                variant="btn-B-WhiteDefault"
              >
                {hasVacation ? "Изменить" : "Выбрать даты"}
              </Button>
            </div>
          )}
        </div>
      </Card>
      <BaseModal open={isOpen} onOpenChange={setIsOpen} title="Отпуск">
        <div className="h-svh overflow-hidden flex flex-col justify-between items-center">
          <Card paddingBottom="l" paddingTop="l"
            title="Выберите даты отпуска"
            titleFont="font-bodytext-m"
            titleGap="xs"
          >
            <FormDateRange
              label="Даты"
              value={dateRange}
              onChange={setDateRange}
              hint="Корректный формат ДД.ММ.ГГГГ"
            />
          </Card>
          <Card rounded="none" paddingTop="s" paddingBottom="l" borderTop={true}>
            <div className="w-full flex justify-center">
              <Button
                variant="btn-B-GreenDefault-lg"
                disabled={
                  dateRange.from === undefined && dateRange.to === undefined
                }
              >
                Сохранить
              </Button>
            </div>
          </Card>
        </div>
      </BaseModal>
    </>
  );
};
