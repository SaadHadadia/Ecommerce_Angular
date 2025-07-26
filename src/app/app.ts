import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, RouterOutlet],
  template: `
    <app-header *ngIf="showHeader" />
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('project');

  constructor(private router: Router) { }

  get showHeader(): boolean {
    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    const routes = this.router.config;

    return routes.some(route => {
      if (route.path === '**') return false;

      const pattern = '^/' + (route.path
        ? route.path.replace(/:([^/]+)/g, '[^/]+').replace(/\//g, '\\/')
        : '') + '$';

      return new RegExp(pattern).test(currentUrl);
    });
  }
}