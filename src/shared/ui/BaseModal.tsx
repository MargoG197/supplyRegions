import { ReactNode } from 'react';
import { SubHeader } from './SubHeader'; 
import { Modal } from './Modal/Modal';

interface BaseModalProps {
  title: string;
  children: ReactNode;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BaseModal = ({
  title,
  children,
  open,
  onOpenChange,
}: BaseModalProps) => {
  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <div className="w-full max-w-125 bg-light-gray-1 mx-auto dark:bg-light-gray-7-logo flex flex-col h-fit max-h-screen">
        <div className="shrink-0 w-full">
          <SubHeader 
            title={title} 
            onClose={() => onOpenChange?.(false)} 
          />
        </div>
        
        <div className="mt-1 flex flex-col overflow-y-auto flex-1 min-h-0 h-screen">
          {children}
        </div>
        </div>
    </Modal>
  );
};