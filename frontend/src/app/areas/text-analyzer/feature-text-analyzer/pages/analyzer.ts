import { Component, computed, inject } from '@angular/core';
import { textAnalyzerStore } from '../data/store';
import { AnalysisSnapshot } from '../data/types';

@Component({
  selector: 'app-analyzer',
  imports: [],
  template: `
    <p>Analyzer</p>
    <textarea
      class="textarea textarea-bordered w-full min-h-40"
      [value]="textStore.text()"
      (input)="textStore.setText($any($event.target).value)"
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
      </div>
      <br />
      <div class="stats stats-horizontal shadow">
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
      <br />

      <div class="stats stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">WPM</div>
          <div class="stat-value text-primary">{{ textStore.wpm() }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Min Word Length</div>
          <div class="stat-value text-primary">{{ textStore.minWordLength() }}</div>
        </div>
      </div>
    }
    <br />
    @for (kw of topKeywords(); track kw.word) {
      <div class="badge badge-outline gap-1">
        <span class="font-semibold">{{ kw.word }}</span>
        <span class="opacity-50">×{{ kw.count }}</span>
      </div>
    }
    <br />
    <button class="btn btn-primary mt-4" (click)="saveToHistory()">Save to History</button>
    <button class="btn btn-primary mt-4" (click)="copyToClipboard()">Copy to Clipboard</button>
  `,
  styles: ``,
})
export class Analyzer {
  protected textStore = inject(textAnalyzerStore);

  private words = computed(
    () =>
      this.textStore
        .text()
        .toLowerCase()
        .match(/\b[a-z']+\b/g) ?? [],
  );

  protected wordCount = computed(() => this.words().length);
  protected charCount = computed(() => this.textStore.text().length);
  protected charCountNoSpaces = computed(() => this.textStore.text().replace(/\s/g, '').length);
  protected vowels = computed(() => (this.textStore.text().match(/[aeiou]/gi) || []).length); // just for fun

  protected sentenceCount = computed(() => {
    const matches = this.textStore.text().match(/[^.!?]+[.!?]+/g);
    return matches ? matches.length : this.textStore.text().trim().length > 0 ? 1 : 0;
  });

  protected paragraphCount = computed(() => {
    const paras = this.textStore
      .text()
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0);
    return paras.length || (this.textStore.text().trim().length > 0 ? 1 : 0);
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

  private readingTimeSecs = computed(() =>
    Math.ceil((this.wordCount() / this.textStore.wpm()) * 60),
  );

  protected readingTimeFormatted = computed(() => {
    const secs = this.readingTimeSecs();
    if (secs < 60) return `${secs}s`;
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return rem > 0 ? `${mins}m ${rem}s` : `${mins}m`;
  });
  private STOP_WORDS = new Set(this.textStore.excludedWords());

  private wordFrequency = computed(() => {
    const excluded = new Set(this.textStore.excludedWords());
    const minLen = this.textStore.minWordLength();
    const freq = new Map<string, number>();
    for (const word of this.words()) {
      if (word.length < minLen || excluded.has(word)) continue;
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

  protected saveToHistory(): void {
    const snapshot: AnalysisSnapshot = {
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
      excerpt:
        this.textStore.text().slice(0, 200) + (this.textStore.text().length > 200 ? '…' : ''),
      wordCount: this.wordCount(),
      charCount: this.charCount(),
      readingTimeSecs: this.readingTimeSecs(),
      topKeywords: this.topKeywords().slice(0, 5),
    };
    this.textStore.addToHistory(snapshot);
  }

  protected copyToClipboard(): void {
    navigator.clipboard.writeText(
      this.textStore.wpm() +
        ' WPM, ' +
        this.textStore.minWordLength() +
        ' Min Word Len\n' +
        `Words: ${this.wordCount()}, Characters: ${this.charCount()}, Sentences: ${this.sentenceCount()}, Paragraphs: ${this.paragraphCount()}\n` +
        `Longest Word: ${this.longestWord()}, Avg Word Length: ${this.avgWordLength()}, Avg Words/Sentence: ${this.avgWordsPerSentence()}, Reading Time: ${this.readingTimeFormatted()}\n` +
        `Top Keywords: ${this.topKeywords()
          .map((kw) => `${kw.word} (${kw.count})`)
          .join(', ')}\n\n` +
        this.textStore.text(),
    );
  }
}
