import { inject, Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AnimatedToastComponent } from '@components/animated-toast/animated-toast.component';

export type ToastType = 'success' | 'warning' | 'error' | 'info' | 'normal';
export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export interface ToastConfigs {
  showIcon?: boolean;
  message?: string;
  title?: string;
  type: ToastType;
  position?: ToastPosition;
  overrideRootConfigs?: Partial<IndividualConfig>;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastr = inject(ToastrService);
  show(configs: ToastConfigs) {
    this.toastr.show(configs.message, configs.title, {
      timeOut: 5000,
      tapToDismiss: false,
      positionClass: `toast-${configs.position || 'top-right'}`,
      enableHtml: true,
      newestOnTop: true,
      toastClass: configs.type,
      toastComponent: AnimatedToastComponent,
      closeButton: true,
      payload: {
        withIcon: configs.showIcon,
      },
      ...configs.overrideRootConfigs,
    });
  }
}
