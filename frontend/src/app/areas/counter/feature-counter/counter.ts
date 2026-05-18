import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AreaNav } from '../../shared/ui-area-nav/area-nav';
import { FizzBuzz } from '../ui-counter/fizz-buzz';

@Component({
  selector: 'app-counter',
  template: `
    <header class="mb-4">
      <p class="text-sm opacity-70">Counter Showing Signals</p>
      <div class="flex items-center justify-between gap-4 mt-1">
        <h2 class="text-2xl font-semibold">Counter</h2>
        <app-area-nav />
      </div>
    </header>
    <section class="bg-base-100 border border-base-300 rounded-box p-6 shadow-sm">
      <app-counter-fizzbuzz />

      <router-outlet />
    </section>
  `,
  styles: ``,
  imports: [RouterOutlet, AreaNav, FizzBuzz],
})
export class Counter {}
