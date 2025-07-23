import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="mt-5 bg-sky-950">
      {{ title() }}
    </div>
  `,
  styles: `
    .header{
      font-size: 24px;
      font-weight: bold;
      color: #333;
      text-align: center;
      margin: 20px 0;
    }
  `
})
export class Header {
  title = signal('Header Component');
}
