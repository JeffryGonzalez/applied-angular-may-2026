import { Routes } from '@angular/router';
import { Home } from './home';

export const todosRoutes: Routes = [
  {
    path: '',
    component: Home,
    data: { area: { label: 'Todos' } },
    children: [
      // list page goes here
    ],
  },
];