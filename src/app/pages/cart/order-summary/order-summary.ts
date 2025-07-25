import { Component, computed, inject } from '@angular/core';
import { Cart } from '../../../services/cart';
import { PrimaryButton } from "../../../components/primary-button/primary-button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButton, RouterLink],
  template: `
    <div class="fixed right-0 flex flex-col justify-between py-4 pr-8 h-[89vh]">
      <div>
        <p class="lg:text-4xl text-3xl font-black leading-9 text-gray-800">Order Summary</p>
        <div class="flex items-center justify-between pt-16">
          <p class="text-base leading-none text-gray-80">Item total:</p>
          <p class="text-base leading-none line-through text-gray-400">{{ '$' + totalPriceWitoutDiscount() }}</p>
        </div>
        <div class="flex items-center justify-between pt-5">
          <p class="text-base leading-none text-gray-80">Item discount:</p>
          <p class="text-base leading-none text-orange-400 font-bold">- {{ totalDiscount() }}</p>
        </div>
        <div class="flex items-center justify-between pt-5">
          <p class="text-base leading-none text-gray-80">Shipping:</p>
          @if(shippingCost > 0) {
          <p class="text-base leading-none text-gray-80">{{ shippingCost }}</p>
          } @else {
            <p class="text-base leading-none font-bold text-green-600">Free</p>
          }
        </div>
        <hr class="border-t border-gray-300 my-4 mt-4" />
      </div>
      <div>
        <div class="flex items-center justify-between">
          <p class="text-lg leading-none text-gray-80 font-bold">Total:</p>
          <p class="text-2xl leading-none text-orange-400 font-bold">{{ totalPriceWithDiscount() }}</p>
        </div>
        <p class="text-[0.75rem] leading-none text-gray-400 mt-3 mb-8">Please refer to your final actual payment amount.</p>
        <app-primary-button
          class="grid px-5"
          label="Checkout ({{ cartService.cart().length }})"
          itemesNum="0"
          SvgPath=""
          routerLink="/checkout" />
      </div>
    </div>
  `,
  styles: ``
})
export class OrderSummary {

  cartService = inject(Cart);

  shippingCost = 0;
  
  totalPriceWitoutDiscount = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      total += item.price;
    }
    return total.toFixed(2);
  });

  totalDiscount = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      total += item.price * (item.discount ? item.discount / 100 : 0);
    }
    return total.toFixed(2);
  });

  totalPriceWithDiscount = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      total += item.price - (item.price * (item.discount ? item.discount / 100 : 0));
    }
    return (total + this.shippingCost).toFixed(2);
  });

}
