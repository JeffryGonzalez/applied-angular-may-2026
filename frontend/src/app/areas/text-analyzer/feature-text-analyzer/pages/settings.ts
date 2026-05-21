import { Component, inject } from '@angular/core';
import { textAnalyzerStore } from '../data/store';

@Component({
  selector: 'app-text-analyzer-settings',
  imports: [],
  template: `
    <h1 class="text-4xl font-bold m-4">Settings</h1>
    <div class="m-4 flex flex-col gap-4">
      <label for="wpm">Words Per Minute (WPM): {{ store.wpm() }}</label>
      <input
        class="range"
        id="wpm"
        type="range"
        class="range"
        min="50"
        max="600"
        step="10"
        [value]="store.wpm()"
        (input)="store.setWpm($event.target.valueAsNumber)"
      />
    </div>

    <div class="m-4 flex flex-col gap-4">
      <label for="minWordLength">Minimum Word Length: {{ store.minWordLength() }}</label>
      <input
        id="minWordLength"
        type="range"
        class="range"
        min="1"
        max="10"
        step="1"
        [value]="store.minWordLength()"
        (input)="store.setMinWordLength($event.target.valueAsNumber)"
      />
    </div>

    <div class="m-4 flex flex-col gap-4">
      <h4 class="text-1xl font-bold">Excluded Words (Stop Words)</h4>
      <p>{{ store.excludedWords().join(', ') }}</p>
    </div>
  `,
  styles: ``,
})
export class Settings {
  protected store = inject(textAnalyzerStore);
}
