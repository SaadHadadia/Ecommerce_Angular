import { Component, inject, signal, HostListener } from '@angular/core';
import ProductData from '../../components/models/products.models';
import Review from '../../components/models/Review.model';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../services/cart';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [RouterLink, CommonModule],
  template: `
    <div class="bg-white mt-14 fixed md:overflow-hidden overflow-y-auto w-full">
      <div class="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" class="sm:mx-auto md:mx-0 lg:mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl md:px-8">
            <li>
              <div class="flex items-center">
                <a href="products/category/{{ product()?.category }}" class="mr-2 text-sm font-medium text-gray-900">{{ product()?.category }}</a>
                <svg viewBox="0 0 16 20" width="16" height="20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <a href="products/type/{{ product()?.type }}" class="mr-2 text-sm font-medium text-gray-900">{{ product()?.type }}</a>
              </div>
            </li>
          </ol>
        </nav>

        <!-- Changed from h-screen to min-h-screen and removed gaps-4 (should be gap-4) -->
        <div class="max-h-[83vh] grid md:grid-cols-2 gap-x-8 justify-center items-start">

          <!-- Image gallery -->
          <div class="md:overflow-y-auto scrollbar-hide md:max-h-[83vh] col-span-1">
            <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:px-8">
              <!-- Removed fixed aspect ratio classes that were causing overflow -->
              <img
                [src]="product()?.image" alt="product image"
                class="w-full h-auto object-cover sm:rounded-lg" />
              
              @if(!isMobile){
              <!-- Reviews -->
              <div class="my-6 mx-0">
                <h3 class="sr-only">Reviews</h3>
                <div class="flex items-center mb-2">
                  <ng-container *ngFor="let star of [1,2,3,4,5]; let i = index">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="size-5 shrink-0"
                      [ngClass]="{
                        'text-yellow-400': i < (product()?.rating || 0),
                        'text-gray-200': i >= (product()?.rating || 0)
                      }"
                    >
                      <path
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </ng-container>

                  <p class="sr-only">{{ product()?.rating }} out of 5 stars</p>
                  <p
                    target="blank"
                    class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >{{ reviewsCount() }} reviews</p
                  >
                </div>

                <ng-container *ngFor="let review of reviews(); let i = index">
                  <div
                    [ngClass]="i === reviewsCount() - 1 ? 'border-none' : 'border-b'"
                    class="py-6 border-gray-200">
                    <div class="flex gap-2 items-center">
                      <h2 class="text-md font-semibold">{{review?.reviewerName }}</h2>
                      <div class="flex space-x-1">
                        <ng-container *ngFor="let star of [1,2,3,4,5]; let i = index">
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            class="size-5 shrink-0"
                            [ngClass]="{
                              'text-yellow-400': i < (review?.rating || 0),
                              'text-gray-200': i >= (review?.rating || 0)
                            }"
                          >
                            <path
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </ng-container>
                      </div>
                    </div>
                    <p class="text-wrap text-sm font-thin mt-3"> {{ review?.comment }} </p>
                  </div>
                </ng-container>
                
              </div>
              }
            </div>
          </div>

          <!-- Product info -->
          <div class="md:overflow-y-auto scrollbar-hide md:max-h-[83vh] mx-auto max-w-2xl px-4 pt-6 pb-0 sm:px-6 lg:max-w-7xl col-span-1 lg:px-8 lg:pt-6">
            <div class="lg:col-span-2 lg:border-r lg:border-gray-200 flex items-center justify-between content-center">
              <h1 class="text-md font-bold tracking-tight text-gray-900 lg:text-xl">{{ product()?.title }}</h1>

              <!-- New Arrivals icon -->
              @if(product()?.isNew){
                <div class="flex items-center">
                  <a href="products/newarrivals" class="bg-green-700 text-white px-4 py-1 rounded-tl-lg rounded-br-lg text-[0.75rem] flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.538 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.783.57-1.838-.196-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                    <span>New Arrivals</span>
                  </a>
                </div>
                }
            </div>

            <!-- Options -->
            <div class="mt-4 lg:row-span-3">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl tracking-tight text-orange-400 font-bold">
                  $\{{ product()?.discountedPrice || product()?.price }}
                  @if (product()?.discountedPrice && product()?.discountedPrice !== 0) {
                    <span class="text-xl tracking-tight text-gray-400 line-through font-thin">
                      $\{{ product()?.price }}
                    </span>
                  }
              </p>

              <!-- Reviews -->
                <div class="mt-6">

                  @if(isMobile) {
                    <h3 class="sr-only">Reviews</h3>
                    <div class="flex items-center">
                      <ng-container *ngFor="let star of [1,2,3,4,5]; let i = index">
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          class="size-5 shrink-0"
                          [ngClass]="{
                            'text-yellow-400': i < (product()?.rating || 0),
                            'text-gray-200': i >= (product()?.rating || 0)
                          }"
                        >
                          <path
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          />
                        </svg>
                      </ng-container>

                      <p class="sr-only">{{ product()?.rating }} out of 5 stars</p>
                      <a
                        [routerLink]="[]" fragment="reviews"
                        class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >{{ reviewsCount() }} reviews</a
                      >
                    </div>
                  }

                <div class="mt-10">

                  <!-- Sizes -->
                  @if(!product()?.size?.includes('One Size')){
                    <div class="mt-10">
                      <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-900">Size</h3>
                        <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                      </div>

                      <fieldset aria-label="Choose a size" class="mt-4">
                        <div
                          [class]="(this.product()?.category?.toLowerCase() !== 'kids' && this.product()?.type?.toLowerCase() === 'jeans')? 'grid-cols-9' : 'grid-cols-4'"
                          class="grid gap-3">
                          @for (size of sizeSet; track size) {
                            <label
                              [attr.aria-label]="size"
                              class="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
                              <input type="radio" name="size"
                              [disabled]="!product()?.size?.includes(size)"
                              class="absolute inset-0 appearance-none focus:outline-none cursor-pointer disabled:cursor-not-allowed" />
                              <span class="text-sm font-medium uppercase group-has-checked:text-white">{{ size }}</span>
                            </label>
                          }
                        </div>
                      </fieldset>
                    </div>
                  } @else {
                    <div class="mt-10">
                      <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-900">This product comes in one size.</h3>
                      </div>
                    </div>
                  }

                  @if( product() && !isInCart(product()!._id) ) {
                    <button
                      [disabled]="!product()?.stock"
                      (click)="
                        $event.stopPropagation();
                        product() ? cartService.addToCart(product()!) : null
                      "class="px-8 py-3 text-base font-medium mt-10 flex w-full items-center justify-center rounded-md border border-transparent  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      Add to cart
                    </button>
                  } @else {
                    <button
                      (click)="$event.stopPropagation()"
                      routerLink="/cart"
                      class="px-8 py-3 text-base font-medium mt-10 flex w-full items-center justify-center rounded-md border border-transparent hover:text-gray-900 focus:text-gray-900 bg-blanchedalmond-hover hover:bg-orange-400 focus:bg-orange-400 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowe">
                      In Cart
                    </button>
                  }
                </div>
              </div>

            <div class="pt-10 pb-6 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-10 border-none">
              <!-- Description and details -->
              <div>
                <div class="space-y-6">
                  <p class="text-base text-gray-900">{{product()?.description}}</p>
                </div>
              </div>

              <div class="mt-10">
                <h2 class="text-sm font-medium text-gray-900">Product details</h2>

                <div class="mt-4 space-y-6">
                  <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                    <li class="text-gray-500">Category: <span>{{product()?.category}}</span></li>
                    <li class="text-gray-500">Type: <span>{{product()?.type}}</span></li>
                    <li class="text-gray-500">Brand: <span>{{product()?.brand}}</span></li>
                  </ul>
                </div>
              </div>
            </div>

              @if(isMobile){
              <!-- Reviews -->
              <div class="my-6 mx-0">
                <h3 id="reviews" class="text-sm font-medium text-gray-900">Reviews</h3>

                <ng-container *ngFor="let review of reviews(); let i = index">
                  <div
                    [ngClass]="i === reviewsCount() - 1 ? 'border-none' : 'border-b'"
                    class="py-6 border-gray-200">
                    <div class="flex gap-2 items-center">
                      <h2 class="text-md font-semibold">{{review?.reviewerName }}</h2>
                      <div class="flex space-x-1">
                        <ng-container *ngFor="let star of [1,2,3,4,5]; let i = index">
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            class="size-5 shrink-0"
                            [ngClass]="{
                              'text-yellow-400': i < (review?.rating || 0),
                              'text-gray-200': i >= (review?.rating || 0)
                            }"
                          >
                            <path
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </ng-container>
                      </div>
                    </div>
                    <p class="text-wrap text-sm font-thin mt-3"> {{ review?.comment }} </p>
                  </div>
                </ng-container>

              </div>
              }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Product {

  product = signal<ProductData | null>(null);
  reviews = signal<Review[] | null>([]);
  reviewsCount = signal(0);

  selectedSize: string | null = null;
  sizeSet: string[] = [];

  isMobile = window.innerWidth < 768;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const res = await fetch('https://fakestoreapiserver.reactbd.org/api/products/' + productId);
    const data = await res.json();
    this.product.set(data);

    if (this.product()?.category?.toLowerCase() === "kids"){
      this.sizeSet = ['2T', '3T', '4T', '5T'];
    } else if (this.product()?.type?.toLowerCase() === "jeans") {
      for (let i = 26; i <= 50; i++) {
        if (i <= 36 || i % 2 === 0) {
          this.sizeSet.push(i.toString());
        }
      }
    }else{
      this.sizeSet = ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
    }

    const res2 = await fetch('https://dummyjson.com/products/1' + productId);
    const data2 = await res2.json();


    this.reviews.set(data2.reviews);
    this.reviewsCount.set(data2.reviews.length);

    this.isMobile = window.innerWidth < 768;

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

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

}
