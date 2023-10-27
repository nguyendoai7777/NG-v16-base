import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingService } from '@services/loading.service';
import { HttpClient } from '@angular/common/http';
import { ExportFileService } from '@services/export-file.service';
import { EChartComponent } from '@components/echart/echart.component';
import { EChartConfigs } from '@components/echart/echart.type';
import { CHART_TEST } from '@helper';
import { AuthService } from '@services/auth.service';
import { ToastService, ToastType } from '@services/toast.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [TranslateModule, EChartComponent, MatRadioModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ExportFileService],
})
export default class DashboardComponent implements OnInit {
  loadingService = inject(LoadingService);
  exportFileService = inject(ExportFileService);
  http = inject(HttpClient);
  authService = inject(AuthService);
  toast = inject(ToastService);

  chartConfig = signal<EChartConfigs>(CHART_TEST['portfolio']);

  ngOnInit() {
    this.http
      .get(
        '/api/cms?category=mt5_account&q=&page=1&page_size=10&user_active=1&kyc=&order_type=desc&order_by=mt5_account'
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
  }

  export(type: ToastType) {
    // this.exportFileService.exportExcel({ data: [{ name: 'DOai', age: 25 }] });

    this.toast.show({
      message: '<h1>Hello</h1>',
      position: 'top-right',
      type,
      showIcon: true,
      overrideRootConfigs: {},
    });
  }
}
