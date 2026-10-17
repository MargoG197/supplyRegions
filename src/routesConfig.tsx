import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { RegistrationPage } from '~pages/Registration/RegistrationPage';
import CuratorPage from '~pages/Curator/CuratorPage'; 
import { MainTab } from '~pages/Curator/ui/MainTab';
import { ReportTab } from '~pages/Curator/ui/ReportTab';
import { RequestTab } from '~pages/Curator/ui/RequestTab';
import { QrTab } from '~pages/Curator/ui/QrTab';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/curator/main" replace />, // Дефолтный редирект
      },
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
      {
        path: 'curator',
        element: <CuratorPage />,
        children: [
          { index: true, element: <Navigate to="main" replace /> },
          { path: 'main', element: <MainTab /> },
          { path: 'report', element: <ReportTab /> },
          { path: 'request', element: <RequestTab /> },
          { path: 'qr', element: <QrTab /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>Страница не найдена</div>,
  },
]);