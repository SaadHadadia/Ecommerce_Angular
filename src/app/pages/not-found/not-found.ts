import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  template: `
    <section class="bg-white h-[100vh] flex items-center justify-center">
      <div class="max-w-screen-xl lg:mb-0 md:mb-[30vh]">
          <div class="mx-auto max-w-screen-sm text-center">
              <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-orange-400">404</h1>
              <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
              <p class="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
              <a href="/" class="inline-flex text-orange-400 hover:text-orange-600 hover:text font-medium rounded-lg text-md px-5 py-2.5 text-center my-4">Continue Shopping</a>
          </div>
      </div>
  </section>
  `,
  styles: ``
})

export class NotFound {

}
