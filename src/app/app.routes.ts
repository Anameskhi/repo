import { Routes } from '@angular/router';
import path from 'path';
import { HeaderComponent } from './layout/header/header.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.routes),
  },

  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        redirectTo: 'products-list',
        pathMatch: 'full',
      },
      {
        path: 'products-list',
        loadComponent: () =>
          import('./pages/products-list/products-list.component').then(
            (m) => m.ProductsListComponent
          ),
      },
      {
        path: 'products-detail/:id',
        loadComponent: () =>
          import('./pages/products-detail/prodacts-detail.component').then(
            (m) => m.ProdactsDetailComponent
          ),
      }
    ],
  },
];
