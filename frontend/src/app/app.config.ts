import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
  withPreloading,
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
