import { Injectable, signal } from '@angular/core';
import Product from '../components/models/products.models';

@Injectable({
  providedIn: 'root'
})
export class Cart {

  cart = signal<Product[]>([]);

  addToCart(product: Product) {
    this.cart.set([...this.cart(), product]);
  }

  removeFromCart(productId: number) {
    this.cart.set(this.cart().filter((item) => item.id !== productId));
  }

  getTotalPriceWitoutDiscount(): string {
    return this.cart().reduce((total, item) => total + (item.price * 1), 0).toFixed(2);
  }

  getTotalDiscount(): string {
    return this.cart().reduce((total, item) => {
      if (item.discount) {
        return total + (item.price * item.discount / 100);
      }
      return total;
    }, 0).toFixed(2);
  }

  getTotalPriceWithDiscount(shippingCost: number ): string {
    return this.cart().reduce((total, item) => {
      if (item.discount) {
        return total + shippingCost + (item.price - (item.price * item.discount / 100));
      }
      return total + shippingCost + item.price;
    }, 0).toFixed(2);
  }

}
