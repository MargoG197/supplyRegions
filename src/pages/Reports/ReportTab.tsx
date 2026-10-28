import { TabPageLayout } from "@/shared/layouts/TabPageLayout";

export const ReportTab = () => {
  return (
    <TabPageLayout title="Отчеты">
      <div className="p-4">
        <h1 className="font-headline-h2 text-light-gray-black dark:text-light-gray-white">
          Отчеты
        </h1>
        <p className="mt-2 font-bodytext-regular text-light-gray-5 dark:text-light-gray-3">
          Здесь будут отчеты.
        </p>
      </div>
    </TabPageLayout>
  );
};
