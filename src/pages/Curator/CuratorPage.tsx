// src/pages/CuratorPage.tsx
import { Outlet } from 'react-router-dom'; 
import { TabBar } from '~widgets/TabBar/TabBar';
import { Header } from '~/widgets/Header/Header';

const CuratorPage = () => {
  return (
    // Используем flex и min-h-screen, чтобы прижать TabBar к низу, если контента мало
    <div className="flex flex-col min-h-screen bg-light-gray-1 dark:bg-light-gray-black">
      
      <Header />
      
      {/* 2. Контент (сюда будет вставляться MainTab, ReportTab и т.д.) */}
      {/* pb-20 (padding-bottom: 80px) нужен, чтобы TabBar не перекрывал нижний текст */}
      <main className="grow pb-13.5 mt-1">
        <Outlet /> 
      </main>

      {/* 3. Таббар */}
      <TabBar />
      
    </div>
  );
};

export default CuratorPage;