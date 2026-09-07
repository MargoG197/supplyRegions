import { ReactNode } from 'react';

interface UIProviderProps {
  children: ReactNode;
}

// Временно отключаем Ant Design
export const UIProvider = ({ children }: UIProviderProps) => {
  return <>{children}</>;
};

// Когда установим Ant Design, вернем:
/*
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

export const UIProvider = ({ children }: UIProviderProps) => {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
*/