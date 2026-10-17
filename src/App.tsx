// src/App.tsx
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './app/stores/authStore';
import './App.css';

const App = () => {
  const { currentUser, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // Если пользователь не авторизован и он не на странице регистрации — на регистрацию
    if (!currentUser && location.pathname !== '/registration') {
      navigate('/registration', { replace: true });
      return;
    }

    // Если пользователь авторизован, но находится на странице регистрации — на главную
    if (currentUser && location.pathname === '/registration') {
      navigate('/curator/main', { replace: true });
    }
  }, [currentUser, isLoading, location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className='h-screen items-center flex flex-col justify-center'>
        <div className='loader'></div>
      </div>
    );
  }

  return <Outlet />;
};

export default App;