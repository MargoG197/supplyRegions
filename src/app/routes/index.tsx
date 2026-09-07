import { createBrowserRouter, Navigate } from 'react-router-dom';
import { WithdrawalsPage, DistributionsPage, CampaignsPage } from '~pages/index';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/withdrawals',
    element: <WithdrawalsPage />,
  },
  {
    path: '/distributions',
    element: <DistributionsPage />,
  },
  {
    path: '/campaigns',
    element: <CampaignsPage />,
  },
]);