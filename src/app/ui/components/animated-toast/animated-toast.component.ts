import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ACTION_TOAST_ANIMATIONS } from '@components/animated-toast/animated-toast.animation';

@Component({
  selector: 'animated-toast',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule],
  styles: [
    `
      .animated-toast-container {
        display: block;
        position: relative;
        overflow: hidden;
        margin: 0 0 6px;
        padding: 10px 10px 10px 10px;
        width: 300px;
        border-radius: 3px 3px 3px 3px;
        color: #ffffff;
        pointer-events: all;
        cursor: pointer;
        min-height: 84px;
        box-shadow: 0 0 10px #d5d5d5;
        transition: 0.25s;
        &:active {
          transform: scale(0.98);
          box-shadow: 0 0 10px #484848;
        }
      }

      .btn-pink {
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
      }

      .close-toast {
        position: absolute;
        top: 0;
        right: 0;
      }

      .toast-top-center {
        top: 12px;
      }

      .toast-top-center {
        bottom: 12px;
      }

      .toast-top-center,
      .toast-bottom-center {
        width: fit-content;
        left: 50%;
        transform: translateX(-50%);
      }

      .toast-type-success {
        background-color: #3dc763;
      }

      .toast-type-warning {
        background-color: #f89406;
      }

      .toast-type-error {
        background-color: #f44336;
      }

      .toast-type-info {
        background-color: #2c7df5;
      }

      .toast-type-normal {
        &:after {
          position: absolute;
          content: '';
          background-color: #f7f7f7;
          display: block;
          inset: 0;
          filter: blur(1px);
          z-index: -1;
        }
        * {
          color: black;
        }
      }
      #toast-container {
        max-height: 100vh;
        overflow: hidden auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    `,
  ],
  animations: [ACTION_TOAST_ANIMATIONS],
  host: {
    class: `animated-toast-container`,
  },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      [class]="options.toastClass"
      [style.display]="state.value === 'inactive' ? 'none' : ''"
    >
      <div style="display: flex">
        <mat-icon
          *ngIf="options.payload?.['withIcon'] && options.toastClass !== 'normal'"
          >{{ iconName()[options.toastClass] }}</mat-icon
        >
        <div
          *ngIf="title"
          [class]="options.titleClass"
          [attr.aria-label]="title"
        >
          {{ title }}
        </div>
      </div>
      <div
        *ngIf="message && options.enableHtml; else raw"
        role="alert"
        aria-live="polite"
        [class]="options.messageClass"
        [innerHTML]="message"
      ></div>
      <ng-template #raw>
        <div
          role="alert"
          aria-live="polite"
          [class]="options.messageClass"
          [attr.aria-label]="message"
        >
          {{ message }}
        </div>
      </ng-template>
      <div *ngIf="options.closeButton" class="close-toast">
        <button mat-icon-button (click)="removeThis($event)">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
    <div *ngIf="options.progressBar">
      <div class="toast-progress" [style.width]="width + '%'"></div>
    </div>
  `,
})
export class AnimatedToastComponent extends Toast implements OnInit {
  #elr = inject(ElementRef<HTMLElement>);
  iconName = signal<any>({
    success: 'done',
    warning: 'error',
    error: 'cancel',
    info: 'info_i',
  });
  constructor(
    public override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  ngOnInit() {
    this.#elr.nativeElement.classList.add(
      `toast-type-${this.options.toastClass}`
    );
  }

  removeThis(e: Event) {
    this.remove();
  }

  /*action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }*/
}
