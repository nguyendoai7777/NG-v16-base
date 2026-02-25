import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LOCAL_STORAGE_KEY, LS } from '@helper';
import { AuthService } from '@services/auth.service';
import { switchMap } from 'rxjs';

const urlWithoutAuth = ['/api/login', '/api/refresh-token', '/api/users/register'];

export function AppInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const authService = inject(AuthService);
    const nonAuthReq = (ctxUrl: string) =>
      req.clone({
        url: ctxUrl,
      });
    const authReq = (token: string, ctxUrl: string) =>
      req.clone({
        url: ctxUrl,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    const nonChangeUrl = req.url.startsWith('http') || req.url.startsWith('/assets');
    const requestWithToken = req.url.startsWith('/api') && !urlWithoutAuth.includes(req.url);
    const url = nonChangeUrl ? req.url : environment.url + req.url;
    const token = LS.getItem(LOCAL_STORAGE_KEY.access_token);

    if (!token) {
      return next(nonAuthReq(url));
    }

    if (!requestWithToken) {
      return next(nonAuthReq(url));
    } else {
      if (authService.isAccessTokenExpired()) {
        return authService.refreshToken().pipe(
          switchMap(({}) => {
            const tk = LS.getItem(LOCAL_STORAGE_KEY.access_token)!;
            return next(authReq(tk, url));
          })
        );
      }
      const tk = LS.getItem(LOCAL_STORAGE_KEY.access_token)!;
      return next(authReq(tk, url));
    }
  };
}
/*
private handlePreemptiveRefresh(request: HttpRequest<any>, next: HttpHandler) {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken().pipe(
      switchMap((newToken) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(newToken.accessToken);
        return next.handle(this.addToken(request, newToken.accessToken));
      }),
      catchError((err) => {
        this.isRefreshing = false;
        this.authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    // CỬA CHẶN: Các request sau sẽ "xếp hàng" ở đây, không chạy tiếp xuống Backend
    return this.refreshTokenSubject.pipe(
      filter(t => t !== null),
      take(1),
      switchMap(newToken => next.handle(this.addToken(request, newToken)))
    );
  }
}
*/
