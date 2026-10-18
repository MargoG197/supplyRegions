import { ReactElement, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubHeader } from './SubHeader'; 

interface BaseModalProps {
  title: string;
  trigger: ReactElement;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const BaseModal = ({
  title,
  trigger,
  children,
  open,
  onOpenChange,
}: BaseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger} />}
      
      <DialogContent 
        className={[
          "max-w-(--app-width)  w-full p-0 gap-0 bg-light-gray-white dark:bg-light-gray-7-logo [&>button]:hidden",
          "max-h-screen", 
          // 2. Делаем окно flex-контейнером
          "flex flex-col rounded-b-none" 
        ].join(' ')}
      >
        {/* Шапка не должна сжиматься */}
        <div className="shrink-0">
          <SubHeader 
            title={title} 
            onClose={() => onOpenChange?.(false)} 
          />
        </div>
        
        {/* Тело. Оно займет всё оставшееся место и будет скроллиться */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};