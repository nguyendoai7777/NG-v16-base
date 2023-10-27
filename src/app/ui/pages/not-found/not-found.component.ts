import { Component } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <navbar />
    <p>not-found works!</p>
  `,
  styles: [],
})
export default class NotFoundComponent {}
