import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'base-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet /> `,
  styles: [],
})
export default class BaseLayoutComponent {}
