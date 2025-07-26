import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  template: `
    <app-header *ngIf="showHeader()" />
    <router-outlet />   
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('project ddd');

  constructor(private router: Router) { }

  showHeader() {
    return this.router.url !== '/not-found';
  }
}
