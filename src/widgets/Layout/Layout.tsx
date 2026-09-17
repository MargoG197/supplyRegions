import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScannerStore } from '~/shared/store/scannerStore';
// import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: '/withdrawals', label: '📦 Выемки' },
    { key: '/distributions', label: '📤 Раздачи' },
    { key: '/campaigns', label: '📋 Региональные акции' },
  ];

  const { openScanner } = useScannerStore();

const handleScanClick = () => {
  openScanner((text:string) => {
    console.log('Отсканировано:', text);
    // Здесь можно обработать результат:
    // navigate(`/withdrawals/${text}`)
    // или показать модалку с подтверждением
  });
};

  return (
    <div className="layout">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="logo">
          {!collapsed ? '🏪 SupplyRegions' : '🏪'}
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`menu-item ${location.pathname === item.key ? 'active' : ''}`}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '☰' : '✕'}
          </button>
          <h2 className="page-title">
            {menuItems.find((item) => item.key === location.pathname)?.label || 'SupplyRegions'}
          </h2>
          <div className="user-info">
            <span>👤 Администратор</span>
          </div>
        </header>

        <main className="content">
          {children}
        </main>
      </div>
      <button
  onClick={handleScanClick}
  style={{
    padding: '8px 16px',
    background: '#1677ff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }}
>
  📷 Сканировать
</button>
    </div>
  );
};