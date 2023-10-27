import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingService, LoadingStyleConfig } from '@services/loading.service';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent implements AfterViewInit {
  @ViewChild('spinner', { read: ElementRef }) spinner!: ElementRef<HTMLElement>;

  #dialogRef = inject(MatDialogRef<LoadingComponent>);
  #loadingService = inject(LoadingService);
  matDialogData = inject<LoadingStyleConfig>(MAT_DIALOG_DATA);
  #elr = inject(ElementRef<HTMLElement>);

  spinnerMode = signal<ProgressSpinnerMode>('indeterminate');
  spinnerValue = signal(20);

  constructor() {
    this.#loadingService.closeLoadingSignal$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#dialogRef.close();
      });
  }

  ngAfterViewInit() {
    const svg = this.#elr.nativeElement.querySelector(
      '.mat-mdc-progress-spinner'
    ) as SVGElement;
    this.spinner.nativeElement.style.width = this.matDialogData.size! + 'px';
    this.spinner.nativeElement.style.height = this.matDialogData.size! + 'px';
    svg.style.setProperty(
      '--mdc-circular-progress-active-indicator-color',
      this.matDialogData.color!
    );
  }
}
