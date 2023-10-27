import { inject, Injectable } from '@angular/core';
import { finalize, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingComponent } from '@components/loading/loading.component';

export interface LoadingStyleConfig {
  color?: string;
  strokeWidth?: number;
  size?: number;
}

const DefaultProps: LoadingStyleConfig = {
  color: 'white',
  strokeWidth: 8,
  size: 100,
};

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  #matDialog = inject(MatDialog);
  closeLoadingSignal$ = new Subject<any>();

  constructor() {}

  startLoading(
    dialogData?: LoadingStyleConfig,
    dialogConfig?: Omit<MatDialogConfig, 'data' | 'panelClass' | 'disableClose'>
  ) {
    this.#matDialog.open(LoadingComponent, {
      ...dialogConfig,
      panelClass: 'root-loading',
      disableClose: true,
      data: { ...DefaultProps, ...dialogData },
    });
  }

  stopLoading() {
    this.closeLoadingSignal$.next(null);
  }

  stopLoadingByEndStream() {
    finalize(() => {
      this.stopLoading();
    });
  }
}
