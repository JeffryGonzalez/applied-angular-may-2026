import { Routes } from '@angular/router';
import { Admin } from './admin';
import { OverviewPage } from './pages/overview';
import { VendorsPage } from './pages/vendors';
import { ItemsPage } from './pages/items';

export const softwareAdminRoutes: Routes = [
  {
    path: '',
    component: Admin,
    data: { area: { label: 'Area Title' } },
    children: [
      {
        path: '',
        component: OverviewPage,
        data: { nav: { label: 'Overview' } },
      },
      {
        path: 'vendors',
        component: VendorsPage,
        data: { nav: { label: 'Vendors' } },
      },
      {
        path: 'items',
        component: ItemsPage,
        data: { nav: { label: 'Items' } },
      },
    ],
  },
];
