import Arrow_left from '~assets/icons/chevron.left.svg?react';

interface SubHeaderProps {
  title: string;
  onClose: (isClosed: boolean) => void;
}

export const SubHeader = ({ title, onClose }: SubHeaderProps) => {
  return (
    <div className="relative bg-light-gray-white flex items-center pt-2 gap-13.5 px-4 h-full min-h-15 text-light-gray-black dark:bg-light-gray-7-logo w-full">
      <Arrow_left
        role="button"
        className="dark:fill-light-gray-2 fill-light-gray-black cursor-pointer "
        onClick={() => onClose(false)}
      />
      
      {/* Заголовок. 
          absolute + inset-0 + flex justify-center items-center 
          делает так, что текст всегда строго по центру экрана, 
          независимо от ширины стрелки слева. 
          pointer-events-none нужен, чтобы можно было кликать сквозь текст. */}
      <h2 className="pointer-events-none font-bodytext-regular text-light-gray-black dark:text-light-gray-1">
        {title}
      </h2>
      
    </div>
  );
};