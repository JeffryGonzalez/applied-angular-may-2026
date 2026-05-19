import { Routes } from '@angular/router';
import { Demos } from './demos';
import { OverviewPage } from './pages/overview';
import { LinkedPage } from './pages/ls';

export const demoRoutes: Routes = [
  {
    path: '',
    component: Demos,
    data: { area: { label: 'Demos' } },
    children: [
      {
        path: '',
        component: OverviewPage,
        data: { nav: { label: 'Overview' } },
      },
      {
        path: 'ls',
        component: LinkedPage,
        data: { nav: { label: 'Linked Signals' } },
      },
    ],
  },
];
