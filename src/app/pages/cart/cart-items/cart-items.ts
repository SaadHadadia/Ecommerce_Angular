import { Component, inject, input } from '@angular/core';
import Product from '../../../components/models/products.models';
import { RemoveButton } from "../../../components/remove-button/remove-button";
import { Cart } from '../../../services/cart';

@Component({
  selector: 'app-cart-items',
  imports: [RemoveButton],
  template: `
    <div class="grid grid-cols-5 gap-4 p-4 items-stresh">
      <img class="w-full" [src]="item().imageUrl" alt="product image">
      <div class="col-span-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pr-6">
            <p class="bold text-lg">{{ item().name }}</p>
            <select aria-label="Quantity"
              class="py-0 px-1 border border-gray-200 focus:outline-none cursor-pointer rounded-sm">
                @for (i of [1, 2, 3, 4, 5]; track i) {
                  <option value="{{ i }}">{{ i }}</option>
                }
            </select>
          </div>
          <div>
            <p class="text-sm">{{ item().description }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between pr-6">
          <app-remove-button (buttonClicked)="cartService.removeFromCart(item().id)" />
          <div>
              <p class="text-xs line-through text-gray-400">{{item().getFormattedPrice()}}</p>
              <p class="text-base font-bold text-orange-400">{{item().getDiscountedPrice()}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class CartItems {
  item = input.required<Product>();
  cartService = inject(Cart);
}
