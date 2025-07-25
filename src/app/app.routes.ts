import { Routes } from '@angular/router';
import { ProductsList } from './pages/products-list/products-list';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
    {
        path: '', 
        component: ProductsList,
        pathMatch: 'full'
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
