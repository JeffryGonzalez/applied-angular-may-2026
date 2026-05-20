import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withLogging } from '../../shared/util-logging/store-logging-feature';

// @Service() // makes it provided in root, you DO NOT HAVE TO DO THIS for a service. Oh, it will give you an error if you do constructor injection.
export class CounterStore {
  #current = signal(0);

  constructor(private http: HttpClient) {}
  get current() {
    return this.#current.asReadonly();
  }

  increment() {
    this.#current.update((c) => c + 1);
  }

  decrement() {
    this.#current.update((c) => c - 1);
  }
}

export const signalCounterStore = signalStore(
  withState({
    current: 0,
    _secret: 'Nobody knows',
  }),
  withLogging('counter'),
  withMethods((store) => {
    return {
      increment: () => patchState(store, { current: store.current() + 1 }),
      decrement: () => patchState(store, { current: store.current() - 1 }),
    };
  }),
);
