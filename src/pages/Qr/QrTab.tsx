import { TabPageLayout } from '@/shared/layouts/TabPageLayout';
import { QrCodesContent } from '@/widgets/QrCodes/QrCodesContent';

export const QrTab = () => (
  <TabPageLayout title="QR-коды">
    <QrCodesContent />
  </TabPageLayout>
);