// import { SubHeader } from "@/shared/ui/SubHeader";
// import { QrCodesContent } from "@/widgets/QrCodes/QrCodesContent";
// import { useNavigate } from "react-router-dom";

// export const QrTab = () => {
//    const navigate = useNavigate();
//   return (
//     <div className="w-full max-w-125 bg-light-gray-1 mx-auto dark:bg-light-gray-7-logo flex flex-col h-dvh max-h-dvh">
//       <div className="shrink-0 w-full">
//         <SubHeader title="QR-коды" onClose={() => navigate('/curator/main')} />
//       </div>

//       <div className="mt-1 flex flex-col overflow-y-auto flex-1 min-h-0">
//         <QrCodesContent />
//       </div>
//     </div>
//   );
// };

import { TabPageLayout } from '@/shared/layouts/TabPageLayout';
import { QrCodesContent } from '@/widgets/QrCodes/QrCodesContent';

export const QrTab = () => (
  <TabPageLayout title="QR-коды">
    <QrCodesContent />
  </TabPageLayout>
);