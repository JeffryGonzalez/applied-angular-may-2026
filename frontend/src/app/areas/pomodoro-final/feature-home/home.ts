import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AreaNav } from '../../shared/ui-area-nav/area-nav';

@Component({
  selector: 'app-pomodoro-final-home',
  imports: [RouterOutlet, AreaNav],
  template: `
    <header class="mb-4">
      <p class="text-sm opacity-70 text-accent">A fresh Pomodoro feature scaffold for the final lab.</p>
      <div class="flex items-center justify-between gap-4 mt-1">
        <h2 class="text-2xl font-semibold text-primary">Pomodoro Final</h2>
        <app-area-nav />
      </div>
    </header>

    <section class="bg-base-100 border border-base-300 rounded-box p-6 shadow-sm">
      <router-outlet />
    </section>
  `,
})
export class PomodoroFinalHome {}
