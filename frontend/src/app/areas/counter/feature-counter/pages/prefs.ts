import { Component, inject, signal } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { counterStore } from '../../data-counter/store';

@Component({
  selector: 'app-counter-prefs',
  imports: [PageHeader],
  template: `
    <app-page-header title="Preferences" description="Set Preferences For the Counter" />
    <div class="prose max-w-none">
      <div class="join">
        <button [disabled]="store.by() === 1" (click)="store.setBy(1)" class="btn join-item">
          1
        </button>
        <button [disabled]="store.by() === 3" (click)="store.setBy(3)" class="btn join-item">
          3
        </button>
        <button [disabled]="store.by() === 5" (click)="store.setBy(5)" class="btn join-item">
          5
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class PrefsPage {
  // We no longer do "constructor injection"
  store = inject(counterStore);
}
