import { ActionCard } from "~/shared/ui/ActionCard";
import { Card } from "~/shared/ui/Card";

import { StatusCard } from "~/shared/ui/StatusCard";
import { Button } from "~/shared/ui/Button";
import { ReportSummary } from "~/widgets/Summary/ReportSummary";
import { WriteOffWidget } from "@/widgets/Reports/WriteOffWidget";
import { QrCodes } from "@/widgets/QrCodes/QrCodes";
import { WithdrawalReportWidget } from "@/widgets/Reports/WithdrawalReportWidget";
import { KnowledgeBaseWidget } from "@/widgets/KnowledgeBase/KnowledgeBaseWidget";
import { DistributionWidget } from "@/widgets/Reports/DistributionWidget";

export const MainTab = () => {
  return (
    <div className="flex flex-col gap-1">
      <Card title="Сверка за 2026 год" paddingTop="l" paddingBottom="l">
        <div className="flex flex-col gap-4 pt-1">
          <ReportSummary />
          <ActionCard
            label="Последний отчет о раздаче 02.02.2026"
            className="-mt-px"
          />
          <Button variant="btn-B-WhiteDefault-lg">Смотреть отчеты</Button>
        </div>
      </Card>
      <Card>
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex justify-between gap-4">
            <WithdrawalReportWidget mainScreen={true} />
            <DistributionWidget />
          </div>
          <WriteOffWidget />
        </div>
      </Card>
      <Card
        title="Заявки нуждающихся"
        rounded="none"
        paddingTop="l"
        paddingBottom="l"
      >
        <div className="flex flex-col gap-2 w-full pt-1 pb-4 max-w-125">
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
        </div>
        <div className="flex flex-col w-full max-w-125">
          {" "}
          <Button variant="btn-B-WhiteDefault-lg">
            Перейти ко всем заявкам
          </Button>
        </div>
      </Card>
      <Card paddingTop="l" paddingBottom="l">
        <div className="flex justify-between gap-4">
          <QrCodes />
          <KnowledgeBaseWidget />
        </div>
      </Card>
    </div>
  );
};
