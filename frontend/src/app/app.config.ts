import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
  withPreloading,
} from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { provideSignalFormsConfig } from '@angular/forms/signals';
import { routes } from './app.routes';
import { authStore } from './areas/shared/util-auth/store';
import { icons } from './areas/shared/util-icons/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withExperimentalAutoCleanupInjectors(),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideIcons(icons),
    authStore,
    provideSignalFormsConfig({
      classes: {
        'input-error': ({ state }) => state().touched() && state().invalid(),
      },
    }),
  ],
};
