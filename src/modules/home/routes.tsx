import type { RouteObject } from 'react-router-dom';
import Home from './Home';
import DesignSystemDocs from './DesignSystemDocs';

export const homeRoutes: RouteObject[] = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'design-system',
    element: <DesignSystemDocs />,
  },
];
