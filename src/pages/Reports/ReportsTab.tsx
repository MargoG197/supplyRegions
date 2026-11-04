import { PATHS } from "@/paths";
import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
import { useNavigate } from "react-router-dom";

export const ReportsTab = () => {
  const navigate = useNavigate();

  return (
    <TabPageLayout title="Отчеты">
       <div className="flex flex-col gap-4">
          <button onClick={() => navigate(PATHS.REPORTS.WITHDRAWAL)}>Подать отчет о выемке</button>
          <button onClick={() => navigate(PATHS.REPORTS.WRITE_OFF)}>Подать отчет о списании</button>
       </div>
    </TabPageLayout>
  );
};