import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('./component/product/product.module').then((m) => m.ProductModule),
        
      },
    ],
  },
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full',
  },
];
