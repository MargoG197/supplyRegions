import { useCallback, useMemo, useState } from "react";
import Arrow_left from "~assets/icons/chevron.left.svg?react";
import { StatusIcon } from "@/shared/ui/Form/StatusIcon";
import { BaseModal } from "@/shared/ui/BaseModal";
import { Badge } from "@/shared/ui/Badge";

import { RequestStatusBaseCard } from "@/shared/ui/Form/RequestStatusBaseCard";
import {
  FILTER_STATUSES,
  REQUEST_STATUS_MAP,
  RequestItem,
} from "@/shared/types/constants";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import classNames from "classnames";
import { EmptyStateModal } from "@/shared/ui/EmptyStateModal";

export type RequestStatus = "critical" | "pending" | "new" | "completed";
const ALL_STATUSES = Object.keys(REQUEST_STATUS_MAP) as RequestStatus[];
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
  {
    id: "6",
    name: "Павел Гринёв",
    category: "Пострадавший в режиме ЧС",
    status: "pending",
    date: "с 11.10.2026",
    isChecked: false,
  },
  {
    id: "7",
    name: "Виктор Сазонов",
    category: "Пенсионер",
    status: "new",
    date: "с 11.10.2026",
    isChecked: false,
  },
  {
    id: "8",
    name: "Ольга Мельник",
    category: "Малоимущая семья",
    status: "completed",
    date: "01.10.2026",
    isChecked: false,
  },
  // {
  //   id: "9",
  //   name: "Виктор Сазонов",
  //   category: "Пенсионер",
  //   status: "new",
  //   date: "с 11.10.2026",
  //   isChecked: false,
  // },
  // {
  //   id: "10",
  //   name: "Ольга Мельник",
  //   category: "Малоимущая семья",
  //   status: "completed",
  //   date: "01.10.2026",
  //   isChecked: false,
  // },
  // {
  //   id: "11",
  //   name: "Виктор Сазонов",
  //   category: "Пенсионер",
  //   status: "new",
  //   date: "с 11.10.2026",
  //   isChecked: false,
  // },
  // {
  //   id: "12",
  //   name: "Ольга Мельник",
  //   category: "Малоимущая семья",
  //   status: "completed",
  //   date: "01.10.2026",
  //   isChecked: false,
  // },
];

export const DariEduRequestsWidget = ({
  onSave,
}: {
  onSave: (card: RequestItem[]) => void;
}) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [requests, setRequests] = useState<RequestItem[]>(mockRequests);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedStatuses, setSelectedStatuses] =
    useState<RequestStatus[]>(ALL_STATUSES);
  const loading = false

  const toggleStatus = (id: RequestStatus) => {
    setSelectedStatuses((prev) => {
      if (prev.length === ALL_STATUSES.length) {
        return [id];
      }

      const next = prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id];

      if (next.length === 0) {
        return ALL_STATUSES;
      }

      return next;
    });
  };

  const checkedRequests = useMemo(
    () => requests.filter((r) => r.isChecked),
    [requests],
  );

  const checkedIds = useMemo(
    () => checkedRequests.map((r) => r.id),
    [checkedRequests],
  );

  const isDirty = useMemo(() => {
    if (checkedIds.length !== savedIds.length) return true;
    const saved = new Set(savedIds);
    return checkedIds.some((id) => !saved.has(id));
  }, [checkedIds, savedIds]);

  const hasChecked = checkedRequests.length > 0;

  const handleSave = () => {
    onSave?.(checkedRequests);
    setSavedIds(checkedIds);
    setIsOpen(false);
    if (isChecked) setIsChecked(false);
  };

  const visibleRequests = useMemo(() => {
    if (selectedStatuses.length === 0) return requests;
    return requests.filter((r) => selectedStatuses.includes(r.status));
  }, [requests, selectedStatuses]);

  const onRequestCardClick = useCallback((id: string, checked: boolean) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: checked } : item,
      ),
    );
  }, []);

  const handleGoToRequests = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="font-caption-regular text-light-gray-black dark:text-light-gray-white">
          Укажите заявки, полученные от ДариЕду
        </label>
        {checkedRequests.length > 0 &&
          checkedRequests.map((r) => <RequestStatusBaseCard card={r} />)}
        <button
          onClick={handleGoToRequests}
          className="btn-B-WhiteDefault flex justify-between items-center pl-3 pr-2.5"
        >
          {hasChecked ? "Изменить заявки" : "Выбрать заявки"}
          <Arrow_left
            role="button"
            className="dark:fill-light-gray-2 fill-light-gray-black cursor-pointer rotate-180"
          />
        </button>
        <div className="flex items-center gap-1.75 ml-1 h-8">
          <StatusIcon
            disabled={hasChecked}
            checked={isChecked}
            onChange={(newValue) => {
              setIsChecked(newValue);
            }}
          />
          <span className={classNames(hasChecked && "text-light-gray-4")}>
            Нет заявок
          </span>
        </div>
      </div>
      {requests.length === 0 && !loading ? (
        <EmptyStateModal
          open={isOpen}
          onOpenChange={setIsOpen}
          title="Заявки"
          emptyTitle="Здесь будут заявки"
          onBack={() => setIsOpen(false)}
        />
      ): (<BaseModal
          marginAfterHeader={false}
          title="Заявки"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="w-full h-full mx-auto flex flex-col justify-start bg-light-gray-1">
            <div className="flex flex-col gap-2 justify-start items-start overflow-hidden pt-2 pl-4 mb-1 pb-2 bg-light-gray-white">
              <div className="flex gap-x-2 justify-center items-center overflow-y-scroll">
                {FILTER_STATUSES.map((status) => {
                  return (
                    <Badge
                      key={status.id}
                      label={status.label}
                      variant={status.variant}
                      active={selectedStatuses.includes(status.id)}
                      onClick={() => toggleStatus(status.id)}
                    />
                  );
                })}
              </div>
              <p className="font-caption-regular">
                Найдено {requests.length} заявок
              </p>
            </div>
            <div className="flex rounded-xs flex-col justify-start items-start max-h-[79%] overflow-y-auto gap-3 p-4 mb-1 bg-light-gray-white">
              {visibleRequests.map((r) => (
                <RequestStatusBaseCard
                  card={r}
                  onCheckChange={onRequestCardClick}
                />
              ))}
            </div>
          </div>
          <Card
            rounded="none"
            paddingTop="s"
            className="h-fit absolute bottom-0"
            paddingBottom="none"
            borderTop={true}
          >
            <div className="w-full flex flex-col justify-center">
              <Button
                disabled={!isDirty}
                onClick={handleSave}
                variant="btn-B-GreenDefault-lg"
              >
                Сохранить
              </Button>
            </div>
          </Card>
        </BaseModal>)}

    </>
  );
};
