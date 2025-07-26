import { Component, inject, signal } from '@angular/core';
import ProductData from '../../components/models/products.models';
import { ActivatedRoute } from '@angular/router';
import { PrimaryButton } from "../../components/primary-button/primary-button";
import { Cart } from '../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  template: `
    <div class="md:p-8 p-0 grid md:grid-cols-3 gaps-4 justify-center items-center md:mt-6 mt-14">
      <img class="rounded-t-lg p-4 w-full h-auto object-contain" [src]="product()?.image" alt="product image">
      <div class="md:col-span-2">
        <h3 class="text-gray-900 font-semibold text-lg tracking-tight">{{ product()?.title }}</h3>
        <p class="md:text-md text-sm">{{ product()?.description }}</p>
        @if (product()?.isNew) {
          <span
            class="inline-block relative font-medium text-white bg-[#0A8800] text-[12px] py-[2px] px-[3px] rounded-tl-[6px] rounded-br-[6px] rounded-tr-none rounded-bl-none align-middle mr-[5px]">
            New Arrival
          </span>
          @if (product()?.category) {
          <p>{{ 'in ' + product()?.category }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" class="tm_yIx" aria-hidden="true"><path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path></svg>
        }}
        <p>{{ product()?.discountedPrice }}</p>
        <p>{{ product()?.price }}</p>
        <p class="mt-5">{{ product()?.brand }}</p>
        <p>{{ product()?.category }}</p>
        <p>{{ product()?.type }}</p>
        <p>Size</p>
        <div class="flex gap-2">
          <div class="flex flex-wrap gap-2">
          @for (size of ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']; track size) {
            <label class="cursor-pointer disabled:cursor-not-allowed">
              <input
                type="radio"
                class="hidden"
                name="size"
                [value]="size"
                [checked]="selectedSize === size"
                (change)="selectedSize = size"
                [disabled]="!product()?.size?.includes(size)"
              />

              <span
                [class]="
                  'inline-block text-sm font-semibold px-3 py-0.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed' +
                  (selectedSize === size
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-900'
                    : 'bg-gray-100 text-gray-900 border border-gray-800')
                    +
                  (!product()?.size?.includes(size)
                    ? ' opacity-50 cursor-not-allowed'
                    : '')
                ">
                {{ size }}
              </span>
            </label>
          }
        </div>


        </div>
        <p class="mt-5">Quantity</p>
        <select aria-label="Quantity"
          class="py-0 px-1 border border-gray-200 focus:outline-none cursor-pointer rounded-md">
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <option value="{{ i }}">{{ i }}</option>
          }
        </select>
        @if( product() && !isInCart(product()!._id) ) {
              <button
                [disabled]="!product()?.stock"
                (click)="
                  $event.stopPropagation();
                  product() ? cartService.addToCart(product()!) : null
                "

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
  `,
  styles: ``
})
export class Product {

  product = signal<ProductData | null>(null);

  selectedSize: string | null = null;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const res = await fetch('https://fakestoreapiserver.reactbd.org/api/products/' + productId);
    const data = await res.json();
    this.product.set(data);
    console.log(this.product());
  }

  selectedSizes: string[] = [];

  onSizeChange(size: string, checked: boolean): void {
    if (checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
  }


  cartService = inject(Cart);

  isInCart(productId: number): boolean {
    if (!productId) return false;
    return this.cartService.cart().some(product => product._id === productId);
  }

}
