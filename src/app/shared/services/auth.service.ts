import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthToken, BaseResponse, JWTDecodeProps, LoginUser, SignUpUser } from '@types';
import { day, LOCAL_STORAGE_KEY, LS, RequestStatus } from '@helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);

  isAccessTokenExpired() {
    const token = LS.getItem(LOCAL_STORAGE_KEY.access_token);
    if (!token) {
      return;
    }
    const { exp } = this.extractTokenFromJWT<JWTDecodeProps>(token);
    const expirationTime = exp * 1000;
    console.log({
      expireAfter: `${day.duration(expirationTime - Date.now()).minutes()}m ${day.duration(expirationTime - Date.now()).seconds()}s`,
    });
    return Date.now() >= expirationTime;
  }

  extractTokenFromJWT<T = JWTDecodeProps>(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload) as T;
  }

  refreshToken() {
    const rfToken = LS.getItem(LOCAL_STORAGE_KEY.refresh_token);
    return this.#http
      .get<BaseResponse<AuthToken>>(`/api/refresh-token`, {
        headers: {
          Authorization: `Bearer ${rfToken}`,
        },
      })
      .pipe(
        tap((res) => {
          if (res.status !== 1000) {
            this.logout();
          } else {
            LS.setItem(LOCAL_STORAGE_KEY.refresh_token, res.data.refresh_token);
            LS.setItem(LOCAL_STORAGE_KEY.access_token, res.data.access_token);
          }
        })
      );
  }

  login(form: LoginUser): Observable<BaseResponse<AuthToken>> {
    return this.#http.post<any>(`/api/login`, form).pipe(
      tap((res) => {
        if (res.status === RequestStatus.OK) {
          console.log(res.data);
          LS.setItem(LOCAL_STORAGE_KEY.refresh_token, res.data.refresh_token);
          LS.setItem(LOCAL_STORAGE_KEY.access_token, res.data.access_token);
          void this.#router.navigateByUrl('/m/dashboard');
        }
      })
    );
  }

  logout() {
    LS.removeItem(LOCAL_STORAGE_KEY.access_token);
    LS.removeItem(LOCAL_STORAGE_KEY.refresh_token);
    void this.#router.navigateByUrl('/b/login');
    /*return this.#http.post(`logout`, {}).pipe(
      tap((res) => {
        LS.removeItem(LOCAL_STORAGE_KEY.token);
        void this.#router.navigateByUrl('/b/login')
      })
    );*/
  }

  signup(form: SignUpUser) {
    const { confirmPassword, ...body } = form;
    return this.#http.post(`/api/users/register`, body);
  }
}
