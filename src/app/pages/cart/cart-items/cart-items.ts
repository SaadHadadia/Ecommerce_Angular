import { Component, inject, input } from '@angular/core';
import Product from '../../../components/models/products.models';
import { RemoveButton } from "../../../components/remove-button/remove-button";
import { Cart } from '../../../services/cart';

@Component({
  selector: 'app-cart-items',
  imports: [RemoveButton],
  template: `
    <div class="grid grid-cols-5 gap-4 p-4 items-stresh">
      <div class="col-span-1 p-0">
        <img class=""
        [src]="item().imageUrl" alt="product image">
      </div>
      <div class="col-span-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pr-6">
            <p class="bold md:text-lg text-md">{{ item().name }}</p>
            <select aria-label="Quantity"
              class="py-0 px-1 border border-gray-200 focus:outline-none cursor-pointer rounded-md">
                @for (i of [1, 2, 3, 4, 5]; track i) {
                  <option value="{{ i }}">{{ i }}</option>
                }
            </select>
          </div>
          <div>
            <p class="md:text-md text-[10px]">{{ item().description }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between pr-6">
          <app-remove-button (buttonClicked)="cartService.removeFromCart(item().id)" />
          <div>
              @if (item().discount) {
                <p class="text-xs line-through text-gray-400">{{item().getFormattedPrice()}}</p>
                <p class="text-base font-bold text-orange-400">{{item().getDiscountedPrice()}}</p>
              } @else {
                <p class="text-base font-bold text-orange-400">{{item().getFormattedPrice()}}</p>
              }
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
