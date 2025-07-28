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

    // Check if the current URL matches any route except the 404 route
    return routes.some(route => {

      // Ignore the 404 route
      if (route.path === '**') return false;
      
      // Create a regex pattern to match the route path
      // Replace route parameters with regex patterns and escape slashes
      const pattern = '^/' + (route.path
        ? route.path.replace(/:([^/]+)/g, '[^/]+').replace(/\//g, '\\/')
        : '') + '$';

      // Test the current URL against the regex pattern
      return new RegExp(pattern).test(currentUrl);
    });
  }
}