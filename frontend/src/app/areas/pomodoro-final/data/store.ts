import { effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const STORAGE_KEY = 'pomodoro-final-prefs';

export const pomodoroStore = signalStore(
  withState({
    workMinutes: 25,
    breakMinutes: 5,
  }),
  withMethods((store) => ({
    setWorkMinutes(minutes: number): void {
      patchState(store, { workMinutes: minutes });
    },
    setBreakMinutes(minutes: number): void {
      patchState(store, { breakMinutes: minutes });
    },
  })),
  withHooks({
    onInit(store) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          patchState(store, JSON.parse(saved));
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      effect(() => {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            workMinutes: store.workMinutes(),
            breakMinutes: store.breakMinutes(),
          }),
        );
      });
    },
  }),
);
