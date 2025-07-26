import { Routes } from '@angular/router';
import { ProductsList } from './pages/products-list/products-list';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/product/product';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductsList,
    },
    {
        path: 'product/:id',
        component: Product
    },
    {
        path: 'cart',
        component: Cart
    },
    // 404 error
    {
        path: '**',
        component: Cart
    }
];
