import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout, DashboardLayout, DefaultLayout } from './layouts';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { homeRoutes } from './modules/home/routes';
import { dashboardRoutes } from './modules/dashboard/routes';
import { authRoutes } from './modules/auth/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [...homeRoutes, ...authRoutes],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [...dashboardRoutes],
      },
    ],
  },
  {
    path: '/auth',
    element: <DefaultLayout />,
    children: [
      // Adicione rotas de autenticação aqui
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
