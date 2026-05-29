import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout, DashboardLayout, DefaultLayout } from './layouts';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

// ---------------------------------------------------------------------------
// Lazy loading por rota — cada módulo só é carregado ao navegar até ele.
// Usa a propriedade `lazy` nativa do React Router v7 (sem React.lazy manual).
// ---------------------------------------------------------------------------

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        lazy: async () => {
          const { default: Home } = await import('./modules/home/Home');
          return { Component: Home };
        },
      },
      {
        path: 'home',
        lazy: async () => {
          const { default: Home } = await import('./modules/home/Home');
          return { Component: Home };
        },
      },
      {
        path: 'design-system',
        lazy: async () => {
          const { default: DesignSystemDocs } = await import('./modules/home/DesignSystemDocs');
          return { Component: DesignSystemDocs };
        },
      },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            lazy: async () => {
              const { default: RiskApp } = await import('./app/App');
              return { Component: RiskApp };
            },
          },
          {
            path: 'configuracoes',
            lazy: async () => {
              const { default: AccountSettings } = await import('./modules/dashboard/AccountSettings');
              return { Component: AccountSettings };
            },
          },
          {
            path: 'chat-ia',
            lazy: async () => {
              const { default: AIChat } = await import('./modules/dashboard/AIChat');
              return { Component: AIChat };
            },
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <DefaultLayout />,
    children: [],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

