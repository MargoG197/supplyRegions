import { useState } from "react";
import { OrderDoc } from "@/widgets/KnowledgeBase/OrderDoc";
import { CuratorDoc } from "@/widgets/KnowledgeBase/CuratorDoc";
import { EventRules } from "@/widgets/KnowledgeBase/EventRules";
import { PhotoReportNotice } from "@/widgets/KnowledgeBase/PhotoReportNotice";
import { AttachedFile } from "@/shared/ui/Form/AttachedFile copy";
import { TabPageLayoutNoGap } from "@/shared/layouts/TabPageLayoutNoGap";
import { Card } from "@/shared/ui/Card";

const tabsData = [
  { id: "documents", label: "Документы" },
  { id: "templates", label: "Шаблоны" },
  { id: "memos", label: "Памятки" },
];

export const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState("documents");

  return (
    <>
      <TabPageLayoutNoGap title="База знаний">
        <div className="w-full mx-auto h-lvh">
          {/* Таб-бар */}
          <div className="flex justify-between items-center px-4.5 pb-2.5 mb-1 bg-light-gray-white">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
              ${
                activeTab === tab.id
                  ? "btn-XS-WhiteDefault"
                  : "btn-XS-NoBorderDefault"
              }
            `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Контент */}
          <div>
            {activeTab === "templates" && (
              <Card paddingBottom="l" paddingTop="l">
                <div className="flex flex-col gap-2">
                  <AttachedFile
                    action="download"
                    fileName="Акт выемки, 2 экз."
                    onDownload={() => {}}
                    className="pl-5"
                  />
                  <AttachedFile
                    action="download"
                    fileName="Ведомость раздачи"
                    onDownload={() => {}}
                    className="pl-5"
                  />
                </div>
              </Card>
            )}
            {activeTab === "documents" && (
              <Card  paddingBottom="l" paddingTop="l">
                <div className="flex flex-col gap-4">
                  <OrderDoc />
                  <CuratorDoc />
                </div>
              </Card>
            )}
            {activeTab === "memos" && (
              <Card  paddingBottom="l" paddingTop="l">
                <div className="flex flex-col gap-4">
                  <EventRules />
                  <PhotoReportNotice />
                </div>
              </Card>
            )}
          </div>
        </div>
      </TabPageLayoutNoGap>
    </>
  );
};
