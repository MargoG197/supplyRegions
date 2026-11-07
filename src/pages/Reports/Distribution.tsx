import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
import { Card } from "@/shared/ui/Card";
import { DistributionReportWidget } from "@/widgets/Reports/DistributionReportWidget";
import { InfoLetterReportWidget } from "@/widgets/Reports/InfoLetterReportWidget";

export const Distribution = () => {
  return (
    <>
      <TabPageLayout title="Подать отчет о раздаче">
        <Card paddingBottom="l" paddingTop="l">
          <div className="flex gap-4">
            <DistributionReportWidget />
            <InfoLetterReportWidget />
          </div>
        </Card>
      </TabPageLayout>
    </>
  );
};
