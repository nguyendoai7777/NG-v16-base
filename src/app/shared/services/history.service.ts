import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LOCAL_STORAGE_KEY, LS } from '@helper';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  #router = inject(Router);

  constructor() {}

  subscribeRouteChange() {
    this.#router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((state) => {
        const { url } = state as NavigationEnd;
        if (!['/', '/404'].includes(url)) {
          this.pushToStack(url);
        }
      });
  }

  pushToStack(route: string) {
    const historyStack = LS.getItem<string[]>(LOCAL_STORAGE_KEY.historyStack);
    let stack: string[] = [];
    if (!historyStack) {
      LS.setItem(LOCAL_STORAGE_KEY.historyStack, []);
    } else {
      stack = historyStack;
      stack.push(route);
      const t = stack.slice(-5);
      LS.setItem(LOCAL_STORAGE_KEY.historyStack, t);
    }
  }
}
