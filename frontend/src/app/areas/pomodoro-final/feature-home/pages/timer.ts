import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';

@Component({
  selector: 'app-pomodoro-final-timer',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Pomodoro Timer" />
    <div class="flex flex-col items-center gap-6 py-4">
      <div class="badge badge-lg badge-error">Focus</div>
      <div class="text-6xl font-mono font-bold text-error">25:00</div>
      <div class="flex gap-4">
        <button class="btn btn-primary w-24">Start</button>
        <button class="btn btn-ghost">Reset</button>
      </div>
    </div>
  `,
})
export class PomodoroFinalTimerPage {}
