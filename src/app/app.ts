import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [Header],
  template: `
    <app-header></app-header>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('project');
}
