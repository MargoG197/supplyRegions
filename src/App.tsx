// src/App.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './app/stores/authStore';
import './App.css';
import { AnimatedOutlet } from './shared/ui/AnimatedOutlet';

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

  return <AnimatedOutlet />;
};

export default App;