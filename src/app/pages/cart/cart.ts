import { Component, inject } from '@angular/core';
import { CartItems } from "./cart-items/cart-items";
import { Cart as CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CartItems],
  template: `
    <div class="grid md:grid-cols-3 md: grid-cols-1 gap-4 justify-center md:items-between md:mt-16 mt-20">
      <div class="md:col-span-2  border-2 border-gray-900">
        @for (item of cartService.cart(); track item.id) {
          <app-cart-items [item]="item"/>
        }
      </div>
      <div class="bg-green-600 h-9 md:col-span-1 hidden"></div>
    </div>
  `,
  styles: `
    #scroll::-webkit-scrollbar {
      width: 1px;
    }

    /* Track */
    #scroll::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    #scroll::-webkit-scrollbar-thumb {
      background: rgb(133, 132, 132);
    }
  `
})

export class Cart {
  cartService = inject(CartService);
}
