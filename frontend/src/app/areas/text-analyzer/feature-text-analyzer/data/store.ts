import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { AnalysisSnapshot } from './types';
import { effect } from '@angular/core';

const DEFAULT_STOP_WORDS = [
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'will',
  'would',
  'could',
  'should',
  'it',
  'its',
  'this',
  'that',
  'i',
  'you',
  'he',
  'she',
  'we',
  'they',
  'not',
  'so',
  'if',
  'as',
  'what',
  'which',
  'who',
];

export const textAnalyzerStore = signalStore(
  withState({
    wpm: 200,
    minWordLength: 3,
    excludedWords: DEFAULT_STOP_WORDS,
    text: '', //to preserve text when switching tabs
    history: [] as AnalysisSnapshot[],
  }),
  withMethods((store) => ({
    setWpm(wpm: number): void {
      patchState(store, { wpm: Math.max(50, Math.min(600, wpm)) });
    },
    setMinWordLength(length: number): void {
      patchState(store, { minWordLength: Math.max(1, Math.min(10, length)) });
    },
    setText(text: string): void {
      patchState(store, { text });
    },
    addToHistory(snapshot: AnalysisSnapshot): void {
      patchState(store, { history: [snapshot, ...store.history()].slice(0, 20) });
    },
    clearHistory(): void {
      patchState(store, { history: [] });
    },
  })),
  withHooks({
    onInit(store) {
      const saved = localStorage.getItem('text-analyzer-state');
      if (saved) patchState(store, JSON.parse(saved));
      effect(() => {
        localStorage.setItem(
          'text-analyzer-state',
          JSON.stringify({
            wpm: store.wpm(),
            minWordLength: store.minWordLength(),
            excludedWords: store.excludedWords(),
            history: store.history(),
            text: store.text(),
          }),
        );
      });
    },
  }),
);
