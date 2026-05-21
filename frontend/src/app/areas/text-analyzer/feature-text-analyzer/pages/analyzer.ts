import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-analyzer',
  imports: [],
  template: `
    <p>Analyzer</p>
    <textarea
      class="textarea textarea-bordered w-full min-h-40"
      [value]="text()"
      (input)="text.set($any($event.target).value)"
      placeholder="Paste or type text to analyze…"
    ></textarea>
    @if (wordCount() > 0) {
      <div class="stats stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Words</div>
          <div class="stat-value text-primary">{{ wordCount() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Characters</div>
          <div class="stat-value text-primary">{{ charCount() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Characters (No Spaces)</div>
          <div class="stat-value text-primary">{{ charCountNoSpaces() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Vowels</div>
          <div class="stat-value text-primary">{{ vowels() }}</div>
        </div>
        <!-- chars and others -->
      </div>
    }
  `,
  styles: ``,
})
export class Analyzer {
  protected text = signal('');

  private words = computed(
    () =>
      this.text()
        .toLowerCase()
        .match(/\b[a-z']+\b/g) ?? [],
  );

  protected wordCount = computed(() => this.words().length);
  protected charCount = computed(() => this.text().length);
  protected charCountNoSpaces = computed(() => this.text().replace(/\s/g, '').length);
  protected vowels = computed(() => (this.text().match(/[aeiou]/gi) || []).length);
}
