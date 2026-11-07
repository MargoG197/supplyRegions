import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { PATHS } from "./paths";

import { RegistrationPage } from "~pages/Registration/RegistrationPage";
import CuratorPage from "~pages/Curator/CuratorPage";
import { MainTab } from "@/pages/Curator/MainTab";
import { ReportsTab } from "@/pages/Reports/ReportsTab";
import { RequestTab } from "@/pages/Requests/RequestTab";
import { QrTab } from "@/pages/Qr/QrTab";
import { WithdrawalReport } from "@/pages/Reports/WithdrawalReport";
import { WriteOffReport } from "@/pages/Reports/WriteOffReport";
import { KnowledgeBase } from "./pages/KnowledgeBase/KnowledgeBase";
import { Profile } from "./pages/Profile/Profile";
import { Distribution } from "./pages/Reports/Distribution";
// import { InfoLetterReport } from "./pages/Reports/InfoLetterReport";
import { DistributionReport } from "./pages/Reports/DistributionReport";

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.CURATOR.MAIN} replace />,
      },
      
      {
        path: PATHS.REGISTRATION, 
        element: <RegistrationPage />,
      },
      
      {
        path: PATHS.CURATOR.ROOT, 
        element: <CuratorPage />,
        children: [
          { index: true, element: <Navigate to="main" replace /> },
          { path: "main", element: <MainTab /> },
        ],
      },
      { 
        path: PATHS.PROFILE, 
        element: <Profile /> 
      },
      {
        path: PATHS.REPORTS.ROOT,
        children: [
          { 
            index: true, 
            element: <ReportsTab /> 
          },
          { 
            path: "withdrawal", 
            element: <WithdrawalReport /> 
          },
          { 
            path: "write-off", 
            element: <WriteOffReport /> 
          },
          { 
            path: "distribution", 
            element: <Distribution /> 
          },
           { 
            path: "distribution-report", 
            element: <DistributionReport /> 
          },
          //  { 
          //   path: "info-letter-report", 
          //   element: <InfoLetterReport /> 
          // },
        ]
      },
      
      { 
        path: PATHS.REQUESTS, 
        element: <RequestTab /> 
      },
      
      { 
        path: PATHS.QR,
        element: <QrTab /> 
      },
      { 
        path: PATHS.KNOWLEDGE_BASE, 
        element: <KnowledgeBase /> 
      },
    ],
  },
  
  // Fallback (если пользователь ввел неверный URL)
  {
    path: PATHS.NOT_FOUND, // "*"
    element: <Navigate to={PATHS.CURATOR.MAIN} replace />,
  },
]);