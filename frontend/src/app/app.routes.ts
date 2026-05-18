import { Route } from '@angular/router';
import { IconName } from './areas/shared/util-icons/icons';

export interface AppNavData {
  nav: { label: string; icon: IconName };
}

export type AppRoute = Route & { data?: AppNavData };

export const routes: AppRoute[] = [
  {
    path: 'home',
    data: { nav: { label: 'Home', icon: 'solarHome' } },
    loadChildren: () => import('./areas/home/feature-home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'docs',
    data: { nav: { label: 'Docs', icon: 'solarBook' } },
    loadChildren: () => import('./areas/docs/feature-docs/docs.routes').then((m) => m.docsRoutes),
  },
  {
    path: 'resources',
    data: { nav: { label: 'Resources', icon: 'solarCode' } },
    loadChildren: () =>
      import('./areas/resources/feature-home/resources.routes').then((m) => m.resourcesRoutes),
  },
  {
    path: 'counter',
    data: { nav: { label: 'Counter', icon: 'solarAddSquareBold' } },
    loadChildren: () =>
      import('./areas/counter/feature-counter/counter.routes').then((c) => c.CounterRoutes),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
