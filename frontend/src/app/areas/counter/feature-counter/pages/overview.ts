import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { counterStore } from '../../data-counter/store';

@Component({
  selector: 'app-counter-page',
  imports: [PageHeader],
  template: `
    <app-page-header title="Counter Overview" description="The Counter" />
    <div class="prose max-w-none">
      <div>
        <button (click)="store.decrement()" class="btn btn-primary">-</button>
        <span class="p-2 text-lg">{{ store.current() }}</span>
        <button (click)="store.increment()" class="btn btn-primary">+</button>
      </div>
      <div>
        <button [disabled]="store.resetDisabled()" (click)="store.reset()" class="btn btn-primary">
          Reset
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class OverviewPage {
  store = inject(counterStore);

  // Fizzbuzz - if current is equally divisible by 3 it is 'fizz', 5 is 'buzz', 3 & 5 'fizzbuzz', otherwise, nothing.
}
