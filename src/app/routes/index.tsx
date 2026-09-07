import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '~widgets/Layout/Layout';
import { WithdrawalsPage, DistributionsPage, CampaignsPage } from '~pages/index';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/withdrawals" replace />,
  },
  {
    path: '/withdrawals',
    element: (
      <Layout>
        <WithdrawalsPage />
      </Layout>
    ),
  },
  {
    path: '/distributions',
    element: (
      <Layout>
        <DistributionsPage />
      </Layout>
    ),
  },
  {
    path: '/campaigns',
    element: (
      <Layout>
        <CampaignsPage />
      </Layout>
    ),
  },
]);