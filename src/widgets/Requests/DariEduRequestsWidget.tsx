import { useState } from "react";
import Arrow_left from "~assets/icons/chevron.left.svg?react";
import { StatusIcon } from "@/shared/ui/Form/StatusIcon";
import { BaseModal } from "@/shared/ui/BaseModal";
import { Badge } from "@/shared/ui/Badge";

import { RequestStatusBaseCard } from "@/shared/ui/Form/RequestStatusBaseCard";
import { FILTER_STATUSES, RequestItem } from "@/shared/types/constants";

export type RequestStatus = "critical" | "pending" | "new" | "completed";


const mockRequests: RequestItem[] = [
  {
    id: "1",
    name: "Ирина Соколова",
    category: "Многодетная семья",
    status: "critical",
    date: "с 11.10.2026",
    isChecked: false,
  },
  {
    id: "2",
    name: "Ольга Мельник",
    category: "Пенсионер",
    status: "critical",
    date: "с 11.10.2026",
    isChecked: false,
  },
  {
    id: "3",
    name: "Павел Гринёв",
    category: "Пострадавший в режиме ЧС",
    status: "pending",
    date: "с 11.10.2026",
    isChecked: false,
  },
  {
    id: "4",
    name: "Виктор Сазонов",
    category: "Пенсионер",
    status: "new",
    date: "с 11.10.2026",
    isChecked: false,
  },
  {
    id: "5",
    name: "Ольга Мельник",
    category: "Малоимущая семья",
    status: "completed",
    date: "01.10.2026",
    isChecked: false,
  },
];


export const DariEduRequestsWidget = () => {
  // const [requests, setRequests] = useState(mockRequests);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleGoToRequests = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full items-start">
        <label className="font-caption-regular text-light-gray-5 dark:text-light-gray-4">
          Укажите заявки, полученные от ДариЕду
        </label>
        <button
          onClick={handleGoToRequests}
          className="btn-B-WhiteDefault flex justify-between items-center pl-3 pr-2.5"
        >
          {" "}
          Выбрать заявки
          <Arrow_left
            role="button"
            className="dark:fill-light-gray-2 fill-light-gray-black cursor-pointer rotate-180"
          />
        </button>
        <div className="flex items-center gap-1.75 ml-1 h-8">
          <StatusIcon
            checked={isChecked}
            onChange={(newValue) => {
              setIsChecked(newValue);
            }}
          />
          <span>Нет заявок</span>
        </div>
      </div>
      <BaseModal
        marginAfterHeader={false}
        title="Заявки"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="w-full h-full mx-auto flex flex-col justify-start bg-light-gray-1">
          <div className="flex flex-col justify-start items-start overflow-hidden h-17 pl-4 mb-1 bg-light-gray-white">
            <div className="flex gap-2 h-10 w-full items-center overflow-y-scroll">
              {FILTER_STATUSES.map((status) => {
                return (
                  <Badge
                    label={status.label}
                    variant={status.variant}
                    size="m"
                  />
                );
              })}
            </div>
            <p className="font-caption-regular">Найдено 38 заявок</p>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 p-4 mb-1 bg-light-gray-white">
            {mockRequests.map((r) => (
              <RequestStatusBaseCard name={r.name} category={r.category} status={r.status} date={r.date} checked={r.isChecked} />
            ))}
          </div>
        </div>
      </BaseModal>
    </>
  );
};
