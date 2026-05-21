import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { pomodoroStore } from '../../data/store';

@Component({
  selector: 'app-pomodoro-final-prefs',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Timer Settings" />
    <div class="flex flex-col gap-6 max-w-md">
      <label class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span>Focus duration</span>
          <span class="opacity-60">{{ store.workMinutes() }} min</span>
        </div>
        <input
          type="range"
          class="range range-error"
          min="1"
          max="60"
          step="1"
          [value]="store.workMinutes()"
          (input)="updateWorkMinutes($event)"
        />
      </label>

      <label class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span>Break duration</span>
          <span class="opacity-60">{{ store.breakMinutes() }} min</span>
        </div>
        <input
          type="range"
          class="range range-info"
          min="1"
          max="30"
          step="1"
          [value]="store.breakMinutes()"
          (input)="updateBreakMinutes($event)"
        />
      </label>
    </div>
  `,
})
export class PomodoroFinalPrefsPage {
  protected store = inject(pomodoroStore);

  protected updateWorkMinutes(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setWorkMinutes(Number(target.value));
  }

  protected updateBreakMinutes(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setBreakMinutes(Number(target.value));
  }
}
