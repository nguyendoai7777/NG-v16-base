import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LOCAL_STORAGE_KEY, LS } from '@helper';

export const canAccessDashboard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  const token = LS.getItem(LOCAL_STORAGE_KEY.access_token);
  if (token) {
    return true;
  }
  void router.navigateByUrl('/b/login');
  return false;
};
