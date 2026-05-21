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
          <div class="stat-title">Sentences</div>
          <div class="stat-value text-primary">{{ sentenceCount() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Paragraphs</div>
          <div class="stat-value text-primary">{{ paragraphCount() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Vowels</div>
          <div class="stat-value text-primary">{{ vowels() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Longest Word</div>
          <div class="stat-value text-primary">{{ longestWord() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Avg Word Length</div>
          <div class="stat-value text-primary">{{ avgWordLength() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Avg Words per Sentence</div>
          <div class="stat-value text-primary">{{ avgWordsPerSentence() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Reading Time</div>
          <div class="stat-value text-primary">{{ readingTimeFormatted() }}</div>
        </div>
      </div>
    }

    @for (kw of topKeywords(); track kw.word) {
      <div class="badge badge-outline gap-1">
        <span class="font-semibold">{{ kw.word }}</span>
        <span class="opacity-50">×{{ kw.count }}</span>
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
  protected vowels = computed(() => (this.text().match(/[aeiou]/gi) || []).length); // just for fun

  protected sentenceCount = computed(() => {
    const matches = this.text().match(/[^.!?]+[.!?]+/g);
    return matches ? matches.length : this.text().trim().length > 0 ? 1 : 0;
  });

  protected paragraphCount = computed(() => {
    const paras = this.text()
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0);
    return paras.length || (this.text().trim().length > 0 ? 1 : 0);
  });

  protected longestWord = computed(() => {
    return this.words().reduce((longest, cur) => (longest.length < cur.length ? cur : longest));
  });

  protected avgWordLength = computed(() => {
    return (
      this.words().reduce((sum, word) => sum + word.length, 0) / this.words().length
    ).toPrecision(3);
  });

  protected avgWordsPerSentence = computed(() => {
    const sentences = this.sentenceCount();
    if (sentences === 0) return '0';
    return (this.wordCount() / sentences).toFixed(1);
  });

  private wpm = signal(200);

  private readingTimeSecs = computed(() => Math.ceil((this.wordCount() / this.wpm()) * 60));

  protected readingTimeFormatted = computed(() => {
    const secs = this.readingTimeSecs();
    if (secs < 60) return `${secs}s`;
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return rem > 0 ? `${mins}m ${rem}s` : `${mins}m`;
  });
  private STOP_WORDS = new Set(['the', 'a', 'an', 'and', 'or', 'is', 'are', 'in', 'of', 'to']);

  private wordFrequency = computed(() => {
    const freq = new Map<string, number>();
    for (const word of this.words()) {
      if (this.STOP_WORDS.has(word)) continue;
      freq.set(word, (freq.get(word) ?? 0) + 1);
    }
    return freq;
  });
  protected topKeywords = computed(() =>
    [...this.wordFrequency().entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count })),
  );
}
