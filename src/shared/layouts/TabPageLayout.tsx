// // src/shared/layouts/TabPageLayout.tsx
// import { useNavigate } from 'react-router-dom';
// import { SubHeader } from '@/shared/ui/SubHeader';

// interface TabPageLayoutProps {
//   title: string;
//   onBack?: () => void;
//   children: React.ReactNode;
// }

// export const TabPageLayout = ({ title, onBack, children }: TabPageLayoutProps) => {
//   const navigate = useNavigate();
//   const handleBack = onBack ?? (() => navigate('/curator/main'));

//   return (
//     <div className="w-full max-w-125 bg-light-gray-1 mx-auto dark:bg-light-gray-7-logo flex flex-col h-dvh max-h-dvh">
//       <div className="shrink-0 w-full">
//         <SubHeader title={title} onClose={handleBack} />
//       </div>
//       <div className="mt-1 flex flex-col overflow-y-auto flex-1 min-h-0">
//         {children}
//       </div>
//     </div>
//   );
// };

// src/shared/layouts/TabPageLayout.tsx
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '@/shared/ui/SubHeader';

interface TabPageLayoutProps {
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
}

export const TabPageLayout = ({ title, onBack, children }: TabPageLayoutProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/curator/main', { replace: true });
  };

  const handleBack = onBack ?? goBack;

  return (
    <div className="w-full max-w-125 bg-light-gray-1 mx-auto dark:bg-light-gray-7-logo flex flex-col h-dvh">
      <div className="shrink-0 w-full">
        <SubHeader title={title} onClose={handleBack} />
      </div>
      <div className="mt-1 flex flex-col overflow-y-auto flex-1 min-h-0 h-full">
        {children}
      </div>
    </div>
  );
};
