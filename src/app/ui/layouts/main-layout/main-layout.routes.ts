import { Route } from '@angular/router';
import { canAccessDashboard } from '@guards/canActivate.guard';

const mainRoutes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('@pages/dashboard/dashboard.component'),
    canMatch: [canAccessDashboard],
  },
];

export default mainRoutes;
