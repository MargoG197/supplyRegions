import { useState } from "react";

import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
import { OrderDoc } from "@/widgets/KnowledgeBase/OrderDoc";
import { CuratorDoc } from "@/widgets/KnowledgeBase/CuratorDoc";
import { EventRules } from "@/widgets/KnowledgeBase/EventRules";
import { PhotoReportNotice } from "@/widgets/KnowledgeBase/PhotoReportNotice";
import { AttachedFile } from "@/shared/ui/Form/AttachedFile copy";

const tabsData = [
  { id: "documents", label: "Документы" },
  { id: "templates", label: "Шаблоны" },
  { id: "memos", label: "Памятки" },
];

export const KnowledgeBase = () => {

  const [activeTab, setActiveTab] = useState("documents");

  return (
    <>
       <TabPageLayout title="База знаний">
        <div className="w-full mx-auto h-lvh bg-light-gray-white">
          {/* Таб-бар */}
          <div className="flex justify-between items-center px-4.5 py-1.5">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
              ${activeTab === tab.id
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
          <div className="px-4">
            {activeTab === "templates" && (
              <div className="flex flex-col gap-2 mt-3">
                <AttachedFile
                  action="download"
                  fileName="Акт выемки, 2 экз."
                  onDownload={() => { }}
                  className="h-15.5 pl-2.5"
                />
                <AttachedFile
                  action="download"
                  fileName="Ведомость раздачи"
                  onDownload={() => { }}
                  className="h-15.5 pl-2.5"
                />
              </div>
            )}
            {activeTab === "documents" && (
              <div className="flex flex-col mt-4 gap-2 overflow-scroll max-h-[82vh]">
                <OrderDoc />
                <CuratorDoc />
              </div>
            )}
            {activeTab === "memos" && (
              <div className="flex flex-col mt-3 gap-2 overflow-scroll max-h-[82vh]">
                <EventRules />
                <PhotoReportNotice />
              </div>
            )}
          </div>
        </div>
        </TabPageLayout>
    </>
  );
};
