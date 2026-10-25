import { ActionCard } from "@/shared/ui/ActionCard";
import { BaseModal } from "@/shared/ui/BaseModal";
import { useState } from "react";
import { QrCodesContent } from "./QrCodesContent";

export const QrCodes = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ActionCard label="QR-коды" onClick={() => setIsOpen(true)} />
      <BaseModal title="QR-коды" open={isOpen} onOpenChange={setIsOpen}>
       <QrCodesContent/>
      </BaseModal>
    </>
  );
};
