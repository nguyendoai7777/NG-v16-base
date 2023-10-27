import {
  ApplicationConfig,
  importProvidersFrom,
  ImportProvidersSource,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideToastr } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { routes } from './app.routes';
import { AppInterceptor } from '@guards/app.interceptor';
import { LS } from '@helper';

const createTranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http);
const getDefaultLang = () => LS.getItem('lang') || 'vi';

const GlobalModule: ImportProvidersSource[] = [MatDialogModule];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AppInterceptor()])),
    /*{
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AppInterceptor
    },*/
    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: getDefaultLang(),
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
      ...GlobalModule,
    ]),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
