import { Component } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { CompNavComponent } from '@components/comp-nav/comp-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [NavbarComponent, CompNavComponent, RouterOutlet],
  template: `
    <navbar />
    <div class="d-flex">
      <comp-nav />
      <div class="render-outlet">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [
    `
      .render-outlet {
        flex: 1;
      }
    `,
  ],
  host: {
    style: `
      display: block;
    `,
  },
})
export default class MainLayoutComponent {}
