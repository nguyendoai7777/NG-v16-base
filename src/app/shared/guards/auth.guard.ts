import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LOCAL_STORAGE_KEY, LS } from '@helper';

export const authGuard: CanMatchFn = (route, state) => {
  const token = LS.getItem(LOCAL_STORAGE_KEY.access_token);
  const router = inject(Router);
  if (token) {
    return true;
  }
  void router.navigateByUrl('/b/login');
  return false;
};
