import { ActionCard } from "~/shared/ui/ActionCard";
import { Card } from "~/shared/ui/Card";

import ArrowRightIcon from "~assets/icons/arrowCircle.svg?react";
import MinusIcon from "~assets/icons/minus.svg?react";
import { StatusCard } from "~/shared/ui/StatusCard";
import { Button } from "~/shared/ui/Button";
import { ReportSummary } from "~/widgets/Summary/ReportSummary";
import { WithdrawalReportModal } from "~/widgets/Reports/WithdrawalReportModal";

export const MainTab = () => {
  return (
    <div className="flex flex-col gap-1">
      <Card title="Сверка за 2026 год">
        <div className="flex flex-col gap-3">
          <ReportSummary />
          <ActionCard label="Последний отчет о раздаче 02.02.2026" />
          <Button variant="btn-B-WhiteDefault">Смотреть отчеты</Button>
        </div>
      </Card>
      <Card>
        <div className="flex flex-col gap-3 justify-between">
          <div className="flex justify-between gap-3">
            <WithdrawalReportModal />
            
            <ActionCard
              icon={<ArrowRightIcon />}
              label="Подать отчет о раздаче"
            />
          </div>

          <ActionCard icon={<MinusIcon />} label="Подать отчет о списании" />
        </div>
      </Card>
      <Card title="Заявки нуждающихся" rounded="none">
        <div className="flex flex-col gap-2.5 w-full max-w-125">
          {/* Новые заявки (Голубая) */}
          <StatusCard
            label="Новые заявки"
            value={28}
            className="bg-[#D6E8FF]"
            textClassName="text-[#00468C]"
            onClick={() => console.log("Переход к новым заявкам")}
          />
          {/* Не обработанные (Желтая) */}
          <StatusCard
            label="Не обработанные заявки"
            value={3}
            className="bg-light-bg-warning-secondary"
            textClassName="text-light-text-warning-default"
            onClick={() => console.log("Переход к необработанным")}
          />
          {/* Критические (Красная) */}
          <StatusCard
            label="Критические заявки"
            value={1}
            className="bg-light-bg-danger-secondary"
            textClassName="text-light-text-danger-default"
            onClick={() => console.log("Переход к критическим")}
          />
          <Button variant="btn-B-WhiteDefault">Перейти ко всем заявкам</Button>
        </div>
      </Card>
      <Card>
        <div className="flex justify-between gap-3">
          <ActionCard label="QR-коды" />
          <ActionCard label="База знаний" />
        </div>
      </Card>
    </div>
  );
};
