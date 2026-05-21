import { Routes } from '@angular/router';
import { Home } from './home';
import { Analyzer } from './pages/analyzer';
import { textAnalyzerStore } from './data/store';
import { Settings } from './pages/settings';
import { History } from './pages/history';

export const TextAnalyzerRoutes: Routes = [
  {
    path: '',
    component: Home,
    providers: [textAnalyzerStore],
    data: { area: { label: 'Area Title' } },
    children: [
      {
        path: '',
        component: Analyzer,
        data: { nav: { label: 'Analyzer' } },
      },
      {
        path: 'history',
        component: History,
        data: { nav: { label: 'History' } },
      },
      {
        path: 'settings',
        component: Settings,
        data: { nav: { label: 'Settings' } },
      },
    ],
  },
];
