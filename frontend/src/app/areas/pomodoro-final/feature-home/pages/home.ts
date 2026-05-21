import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';

@Component({
  selector: 'app-pomodoro-final-home-page',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Pomodoro Final" description="Start with the Pomodoro feature shell and add pages next." />
    <div class="mt-6 prose prose-invert">
      <p>This is the new Pomodoro Final feature area. Build your first page here.</p>
      <p>In sprint 2, add the timer page and hook up the child route.</p>
    </div>
  `,
})
export class PomodoroFinalHomePage {}
