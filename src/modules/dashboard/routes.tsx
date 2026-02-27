import type { RouteObject } from 'react-router-dom';
import FinancialDashboard from '@/components/pages/Dashboard/FinancialDashboard';

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <FinancialDashboard />,
  },
];
