import { Component, inject, HostListener} from '@angular/core';
import { CartItems } from "./cart-items/cart-items";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Cart as CartService } from '../../services/cart';
import { OrderSummary } from "./order-summary/order-summary";
import { PrimaryButtonMv } from "../../components/primary-button/primary-button-mv/primary-button-mv";

@Component({
  selector: 'app-cart',
  imports: [CartItems, OrderSummary, PrimaryButtonMv],
  template: `
    <div class="grid md:grid-cols-3 md: grid-cols-1 gap-4 justify-center md:items-between md:mt-16 mt-20">
      <div class="md:col-span-2">
        @for (item of cartService.cart(); track item._id) {
          <app-cart-items [item]="item"/>
        }
      </div>
      @if (!isMobile) {
        <div class="md:col-span-1 px-4">
          <app-order-summary />
        </div>
      } @else {
        <app-primary-button-mv />
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
  
  breakpointObserver = inject(BreakpointObserver);

  isMobile: boolean = false;

  ngOnInit() {
    this.breakpointObserver.observe([`(max-width: 767px)`]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

}
