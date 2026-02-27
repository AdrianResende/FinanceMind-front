import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout, DefaultLayout } from './layouts';
import { homeRoutes } from './modules/home/routes';
import { dashboardRoutes } from './modules/dashboard/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [...homeRoutes, ...dashboardRoutes],
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
