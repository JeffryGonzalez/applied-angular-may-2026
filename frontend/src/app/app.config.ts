import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
} from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { routes } from './app.routes';
import { icons } from './areas/shared/util-icons/icons';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { authStore } from './areas/shared/util-auth/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes, withExperimentalAutoCleanupInjectors(), withComponentInputBinding()),
    provideIcons(icons),
    authStore,
    provideSignalFormsConfig({
      classes: {
        'input-error': ({ state }) => state().touched() && state().invalid(),
      },
    }),
  ],
};
