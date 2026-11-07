import { RequestStatus } from "@/widgets/Requests/DariEduRequestsWidget";
import { BadgeVariant } from "../ui/Badge";

export interface RequestItem {
  id: string;
  name: string;
  category: string;
  status: RequestStatus;
  date: string;
  isChecked?: boolean;
}
 export const REQUEST_STATUS_MAP: Record<
  RequestStatus,
  { label: string; variant: BadgeVariant }
> = {
  critical: {
    label: "Критическая",
    variant: "critical",
  },
  pending: {
    label: "Не обработанная",
    variant: "pending",
  },
  new: {
    label: "Новая",
    variant: "new",
  },
  completed: {
    label: "Выполненная",
    variant: "completed",
  },
};

export const FILTER_STATUSES = Object.entries(REQUEST_STATUS_MAP).map(
  ([key, value]) => ({
    id: key as RequestStatus,
    ...value,
  }),
);