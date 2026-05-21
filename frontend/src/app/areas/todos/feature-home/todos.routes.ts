import { Routes } from '@angular/router';
import { Home } from './home';
import { todosStore } from '../data/store';

export const todosRoutes: Routes = [
  {
    path: '',
    component: Home,
    providers: [todosStore],
    data: { area: { label: 'Todos' } },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/list').then((m) => m.ListPage),
        data: { nav: { label: 'List' } },
      },
    ],
  },
];