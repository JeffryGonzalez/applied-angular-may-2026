import { Routes } from '@angular/router';
import { PomodoroFinalHome } from './home';
import { pomodoroStore } from '../data/store';

export const pomodoroFinalRoutes: Routes = [
  {
    path: '',
    component: PomodoroFinalHome,
    providers: [pomodoroStore],
    data: { area: { label: 'Pomodoro Final' } },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/timer').then((m) => m.PomodoroFinalTimerPage),
        data: { nav: { label: 'Timer' } },
      },
      {
        path: 'prefs',
        loadComponent: () => import('./pages/prefs').then((m) => m.PomodoroFinalPrefsPage),
        data: { nav: { label: 'Settings' } },
      },
      {
        path: 'overview',
        loadComponent: () => import('./pages/home').then((m) => m.PomodoroFinalHomePage),
        data: { nav: { label: 'Overview' } },
      },
    ],
  },
];
