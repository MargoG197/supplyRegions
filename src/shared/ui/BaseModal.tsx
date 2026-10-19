import { ReactNode } from 'react';
import { SubHeader } from './SubHeader'; 
import { ModalTop } from './Modal/ModalTop';

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
    <ModalTop isOpen={open} onOpenChange={onOpenChange}>
      <div className="w-full max-w-125 bg-light-gray-white dark:bg-light-gray-7-logo h-screen flex flex-col">
        <div className="shrink-0 w-full">
          <SubHeader 
            title={title} 
            onClose={() => onOpenChange?.(false)} 
          />
        </div>
        
        <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0">
          {children}
        </div>
        </div>
    </ModalTop>
  );
};