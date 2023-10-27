import { Route } from '@angular/router';

const baseLayoutRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('@pages/auth/login/login.component'),
    // canMatch: [nonAuthGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('@pages/auth/signup/signup.component'),
  },
];

export default baseLayoutRoutes;
