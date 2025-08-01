import { Component, inject, Inject } from '@angular/core';
import { Cart } from '../../../services/cart';
import { PrimaryButton } from "../primary-button";

@Component({
  selector: 'app-primary-button-mv',
  imports: [PrimaryButton],
  template: `
    <div class="grid grid-cols-4 px-6 antialiased fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 shadow bg-gray-100">
      <div>
        <div class="flex items-center justify-between h-full">
          <p class="text-lg leading-none text-gray-80 font-bold">Total:</p>
          <p class="text-2xl leading-none text-orange-400 font-bold">{{ 200 }}</p>
        </div>
      </div >
      <app-primary-button
          class="col-span-2 col-start-3 grid px-5 mb-2"
          label="Checkout ({{ cartService.cart().length }})"
          itemesNum="0"
          SvgPath=""
          routerLink="/checkout" />
    </div>
  `,
  styles: ``
})
export class PrimaryButtonMv {

  cartService = inject(Cart);

}
