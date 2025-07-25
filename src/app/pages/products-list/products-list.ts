import { Component, signal } from '@angular/core';
import Product from '../../components/models/products.models';
import { ProductCard } from "./product-card/product-card";

@Component({
  selector: 'app-products-list',
  imports: [ProductCard],
  template: `
    <div class="md:p-8 p-0 grid lg:grid-cols-4 md:grid-cols-3 gaps-4 justify-center items-center md:mt-6 mt-14">
      @for (product of products(); track product._id) {
        <app-product-card [product]="product" />
      }
    </div>
  `,
  styles: ``
})
export class ProductsList {

  async ngOnInit(){
    const res = await fetch('https://fakestoreapiserver.reactbd.org/api/products');
    const data = await res.json();
    this.products.set(data.data);
    console.log(this.products());
  }

  products = signal<Product[]>([]);
}
