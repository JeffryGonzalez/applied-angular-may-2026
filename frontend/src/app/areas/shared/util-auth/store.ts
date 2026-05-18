import { signalStore, withComputed, withState } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { authActions } from './actions';
import { computed } from '@angular/core';

type AuthState =
  | { kind: 'authenticated'; user: { name: string; email: string } }
  | { kind: 'unauthenticated' };

export const authStore = signalStore(
  withState<AuthState>({ kind: 'unauthenticated' }),
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
