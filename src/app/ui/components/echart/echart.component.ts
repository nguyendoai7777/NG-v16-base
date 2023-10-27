import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import * as echarts from 'echarts';
import { EChartConfigs } from '@components/echart/echart.type';

/**
 * required [hostElementHeight] or [size] to initialize the chart
 **/

@Component({
  selector: 'echart',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  host: {
    style: `
      display: block;
    `,
  },
})
export class EChartComponent implements AfterViewInit {
  #elr = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) chartConfig!: EChartConfigs;

  @Input() size?: number;

  /**
   * @example
   * hostElementHeight="500px"
   * or
   * [hostElementHeight]="'500px'"
   **/
  @Input() hostElementHeight?: string;

  @Input() renderMode: 'svg' | 'canvas' = 'svg';
  @Input() theme: 'light' | 'dark' | string | null = null;

  @HostBinding('style.height') get height() {
    return this.hostElementHeight ? this.hostElementHeight : '';
  }

  ngAfterViewInit() {
    echarts
      .init(this.#elr.nativeElement, this.theme, {
        ...(this.size && {
          width: this.size,
          height: this.size,
        }),
        renderer: this.renderMode,
      })
      .setOption(this.chartConfig);
  }
}
