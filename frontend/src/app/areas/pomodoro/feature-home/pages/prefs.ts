import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { pomodoroStore } from '../../data/store';

@Component({
  selector: 'app-pomodoro-prefs',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Timer Settings" />
    <div class="flex flex-col gap-4 max-w-md">
      <label class="flex flex-col gap-1">
        <span class="flex justify-between">
          <span>Focus Duration</span>
          <span class="opacity-60">{{ store.workMinutes() }} min</span>
        </span>
        <input
          type="range"
          class="range range-error"
          min="1"
          max="60"
          step="1"
          [value]="store.workMinutes()"
          (input)="store.setWorkMinutes(+$any($event.target).value)"
        />
      </label>
      <!-- Repeat for breakMinutes -->
    </div>
  `,
})
export class PrefsPage {
  protected store = inject(pomodoroStore);
}
