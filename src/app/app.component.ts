import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HistoryService } from '@services/history.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [``],
})
export class AppComponent {
  historyService = inject(HistoryService);
  constructor() {
    this.historyService.subscribeRouteChange();
  }
}
