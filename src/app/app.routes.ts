import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { nonAuthGuard } from '@guards/non-auth.guard';

export const routes: Routes = [
  {
    path: 'b',
    loadComponent: () => import('./ui/layouts/base-layout/base-layout.component'),
    loadChildren: () => import('./ui/layouts/base-layout/base-layout.routes'),
    canMatch: [nonAuthGuard],
  },
  {
    path: 'm',
    loadComponent: () => import('./ui/layouts/main-layout/main-layout.component'),
    loadChildren: () => import('./ui/layouts/main-layout/main-layout.routes'),
    canMatch: [authGuard],
  },
  {
    path: '404',
    loadComponent: () => import('./ui/pages/not-found/not-found.component'),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
