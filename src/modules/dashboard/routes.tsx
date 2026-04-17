import type { RouteObject } from 'react-router-dom';
import RiskApp from '@/app/App';

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <RiskApp />,
  },
];
