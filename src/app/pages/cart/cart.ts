import { Component, inject, OnInit, HostListener} from '@angular/core';
import { CartItems } from "./cart-items/cart-items";
import { Cart as CartService } from '../../services/cart';
import { OrderSummary } from "./order-summary/order-summary";

@Component({
  selector: 'app-cart',
  imports: [CartItems, OrderSummary],
  template: `
    <div class="grid md:grid-cols-3 md: grid-cols-1 gap-4 justify-center md:items-between md:mt-16 mt-20">
      <div class="md:col-span-2">
        @for (item of cartService.cart(); track item.id) {
          <app-cart-items [item]="item"/>
        }
      </div>
      @if (!isMobile) {
        <div class="md:col-span-1 px-4">
          <app-order-summary />
        </div>
      } @else {
        
      }
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

  isMobile = window.innerWidth < 768;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 768;
  }

}
