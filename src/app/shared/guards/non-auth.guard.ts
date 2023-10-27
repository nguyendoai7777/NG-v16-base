import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LOCAL_STORAGE_KEY, LS } from '@helper';

export const nonAuthGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);

  const token = LS.getItem(LOCAL_STORAGE_KEY.access_token);
  const historyStack = LS.getItem<string[]>(LOCAL_STORAGE_KEY.historyStack);
  if (!token) {
    return true;
  }
  void router.navigateByUrl(historyStack?.at(-1) || '/m/dashboard');
  return false;
};
