import { Routes } from '@angular/router';
import { PublicLayout } from './core/layouts/public/public-layout/public-layout';
import { authGuard } from '../app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/public/home-component/home-component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/pages/public/about-us-component/about-us-component').then(
            (m) => m.AboutUsComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/pages/public/contact-us-component/contact-us-component').then(
            (m) => m.ContactUsComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/public/products-component/products-component').then(
            (m) => m.ProductsComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/pages/private/login-component/login-component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layouts/private/private-layout/private-layout').then((m) => m.PrivateLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/pages/private/dashboard-component/dashboard-component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/private/product-component/pages/product/product').then(
            (m) => m.ProductsComponent,
          ),
      },
      {
        path: 'carts',
        loadComponent: () =>
          import('./features/pages/private/cart-component/pages/cart/cart').then(
            (m) => m.CartsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
