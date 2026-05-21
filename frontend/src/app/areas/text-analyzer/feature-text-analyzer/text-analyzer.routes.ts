import { Routes } from '@angular/router';
import { Home } from './home';
import { Analyzer } from './pages/analyzer';

export const TextAnalyzerRoutes: Routes = [
  {
    path: '',
    component: Home,
    data: { area: { label: 'Area Title' } },
    children: [
      {
        path: '',
        component: Analyzer,
        data: { nav: { label: 'Analyzer' } },
      },
    ],
  },
];
