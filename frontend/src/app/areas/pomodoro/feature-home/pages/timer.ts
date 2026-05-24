import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { pomodoroStore } from '../../data/store';

@Component({
  selector: 'app-pomodoro-timer',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Pomodoro Timer" />
    <div class="flex flex-col items-center gap-6 py-4">
      <div
        class="badge badge-lg"
        [class.badge-error]="mode() === 'work'"
        [class.badge-info]="mode() === 'break'"
      >
        {{ mode() === 'work' ? 'Focus' : 'Break' }}
      </div>
      <div
        class="radial-progress text-2xl font-mono font-bold text-error"
        [style.--value]="progressPercent()"
        [style.--size]="'12rem'"
        [style.--thickness]="'8px'"
        role="progressbar"
      >
        {{ formattedTime() }}
      </div>
      <div class="flex gap-4">
        <button class="btn btn-primary w-24" (click)="toggleTimer()">{{ startLabel() }}</button>
        <button class="btn btn-ghost" (click)="reset()">Reset</button>
      </div>
    </div>
  `,
})
export class TimerPage {
  protected store = inject(pomodoroStore);
  //protected secondsRemaining = signal(25 * 60);
  protected secondsRemaining = signal(this.store.workMinutes() * 60);
  protected isRunning = signal(false);
  protected startLabel = computed(() => (this.isRunning() ? 'Pause' : 'Start'));

  protected sessionDuration = computed(() =>
    this.mode() === 'work' ? this.store.workMinutes() * 60 : this.store.breakMinutes() * 60,
  );

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      if (this.secondsRemaining() === 0 && this.isRunning()) {
        this.pause();
        this.mode.update((m) => (m === 'work' ? 'break' : 'work'));
        this.secondsRemaining.set(this.sessionDuration());
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.intervalId !== null) clearInterval(this.intervalId);
    });
  }

  protected formattedTime = computed(() => {
    const s = this.secondsRemaining();
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  protected start(): void {
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.secondsRemaining.update((s) => s - 1);
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
    this.secondsRemaining.set(this.sessionDuration());
  }
  // UPDATED THIS
  protected toggleTimer(): void {
    if (this.isRunning()) {
      this.pause();
    } else {
      this.start();
    }
  }

  protected progressPercent = computed(() => {
    const total = this.sessionDuration();
    return Math.round(((total - this.secondsRemaining()) / total) * 100);
  });

  protected mode = signal<'work' | 'break'>('work');

  //protected sessionDuration = computed(() => (this.mode() === 'work' ? 25 * 60 : 5 * 60));
}
