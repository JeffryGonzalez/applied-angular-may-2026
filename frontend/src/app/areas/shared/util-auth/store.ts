import { signalStore, withComputed, withState } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { authActions } from './actions';
import { computed } from '@angular/core';
import { withLogging } from '../util-logging/store-logging-feature';

type AuthState =
  | { kind: 'authenticated'; user: { name: string; email: string } }
  | { kind: 'unauthenticated' };

export const authStore = signalStore(
  withState<AuthState>({ kind: 'unauthenticated' }),
  withLogging('auth'),
  withReducer(
    on(authActions.login, () => ({
      kind: 'authenticated',
      user: { name: 'John Doe', email: 'john.doe@example.com' },
    })),
    on(authActions.logout, () => ({ kind: 'unauthenticated' })),
  ),
  withComputed((state) => ({
    isAuthenticated: computed(() => state.kind() === 'authenticated'),
  })),
);
