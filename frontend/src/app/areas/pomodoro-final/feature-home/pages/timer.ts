import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';

@Component({
  selector: 'app-pomodoro-final-timer',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Pomodoro Timer" />
    <div class="flex flex-col items-center gap-6 py-4">
      <div class="badge badge-lg badge-error">Focus</div>
      <div
        class="radial-progress font-mono font-bold"
        [class.text-error]="true"
        [style.--value]="progressPercent()"
        [style.--size.rem]="12"
        [style.--thickness.px]="8"
        role="progressbar"
        [attr.aria-valuenow]="progressPercent()"
      >
        <span class="text-2xl">{{ formattedTime() }}</span>
      </div>
      <div class="flex gap-4">
        <button class="btn btn-primary w-24" (click)="toggleTimer()">{{ startLabel() }}</button>
        <button class="btn btn-ghost" (click)="reset()">Reset</button>
      </div>
    </div>
  `,
})
export class PomodoroFinalTimerPage {
  private destroyRef = inject(DestroyRef);

  protected secondsRemaining = signal(25 * 60);
  protected isRunning = signal(false);

  protected formattedTime = computed(() => {
    const seconds = Math.max(0, this.secondsRemaining());
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  });

  protected progressPercent = computed(() => {
    const total = 25 * 60;
    if (!total) return 0;
    return Math.round(((total - this.secondsRemaining()) / total) * 100);
  });

  protected startLabel = computed(() => (this.isRunning() ? 'Pause' : 'Start'));

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
    });
  }

  protected toggleTimer(): void {
    if (this.isRunning()) {
      this.pause();
    } else {
      this.start();
    }
  }

  protected start(): void {
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.secondsRemaining.update((seconds) => Math.max(0, seconds - 1));
    }, 1000);
  }

  protected pause(): void {
    this.isRunning.set(false);
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  protected reset(): void {
    this.pause();
    this.secondsRemaining.set(25 * 60);
  }
}
