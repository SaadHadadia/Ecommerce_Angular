import { Component, inject, input} from '@angular/core';
import Product from '../../../components/models/products.models';
import { Cart } from '../../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  template: `
    <div class="max-w-lg mx-auto p-4">
      <div class="bg-white shadow-md rounded-lg max-w-2xs relative cursor-pointer" [routerLink]="'/product/' + product()._id">
        <div class="relative overflow-hidden h-full max-h-[300px]">
          <div class="block pt-6">
            <img class="rounded-t-lg p-4 w-full h-auto object-contain" [src]="product().image" alt="product image">
          </div>
        </div>
        <div class="px-5 pb-5">
          <h3 class="text-gray-900 font-semibold text-lg tracking-tight">{{ product().title }}</h3>
          <div class="flex items-center mt-2.5 mb-5">
            <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
              </path>
            </svg>
            <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
              </path>
            </svg>
            <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
              </path>
            </svg>
            <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
              </path>
            </svg>
            <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
              </path>
            </svg>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{{ product().rating }}</span>
          </div>
          <div class="flex items-end justify-between">
            <div class="flex flex-col ">
              <span class="text-[12px] line-through text-gray-400">$ {{ product().price }}</span>
              <span class="text-lg font-bold text-gray-900">$ {{ product().discountedPrice }}</span>
            </div>
            @if( !isInCart(product()._id) ) {
              <button
                [disabled]="!product().stock"
                (click)="$event.stopPropagation(); cartService.addToCart(product())"
                class="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                Add to cart
              </button>
            } @else {
              <button
                (click)="$event.stopPropagation()"
                routerLink="/cart"
                class="hover:text-gray-900 focus:text-gray-900 bg-blanchedalmond-hover hover:bg-orange-400 focus:bg-orange-400 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowe">
                In Cart
              </button>
            }
          </div>
        </div>

        <span
          class="absolute top-2 right-2 text-[10px] font-bold"
          [class]= "product().stock ? 'text-green-500' : 'text-red-500'">
          @if (product().stock) { {{product().stock}} left}
          @else { Out of Stock }
        </span>
      </div>
    </div>
  `,
  styles: ``
})

export class ProductCard {
  product = input.required<Product>();
  cartService = inject(Cart);

  isInCart(productId: number): boolean {
    return this.cartService.cart().some(product => product._id === productId);
  }
}
