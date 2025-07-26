import { effect, Injectable, signal } from '@angular/core';
import Product from '../components/models/products.models';

const CART_STORAGE_KEY = 'app_cart';

@Injectable({
  providedIn: 'root'
})
export class Cart {

  // Initialize signal with data from localStorage if available
  private initialCart = this.loadCartFromStorage();
  cart = signal<Product[]>(this.initialCart);

  constructor() {
    // Automatically persist to localStorage whenever the cart changes
    effect(() => {
      const cartValue = this.cart();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartValue));
    });
  }

  addToCart(product: Product) {
    this.cart.set([...this.cart(), product]);
  }

  removeFromCart(productId: number) {
    this.cart.set(this.cart().filter((item) => item._id !== productId));
  }

  private loadCartFromStorage(): Product[] {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  clearCart() {
    this.cart.set([]);
  }

}
