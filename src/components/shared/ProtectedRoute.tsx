import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore, useUIStore } from '@/stores';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      openLoginModal();
    }
  }, [isAuthenticated, openLoginModal]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}