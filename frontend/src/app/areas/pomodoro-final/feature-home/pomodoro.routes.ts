import { Routes } from '@angular/router';
import { PomodoroFinalHome } from './home';

export const pomodoroFinalRoutes: Routes = [
  {
    path: '',
    component: PomodoroFinalHome,
    data: { area: { label: 'Pomodoro Final' } },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/timer').then((m) => m.PomodoroFinalTimerPage),
        data: { nav: { label: 'Timer' } },
      },
      {
        path: 'overview',
        loadComponent: () => import('./pages/home').then((m) => m.PomodoroFinalHomePage),
        data: { nav: { label: 'Overview' } },
      },
    ],
  },
];
