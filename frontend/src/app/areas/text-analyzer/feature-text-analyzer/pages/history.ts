import { Component, inject } from '@angular/core';
import { textAnalyzerStore } from '../data/store';
import { AnalysisSnapshot } from '../data/types';
import { DatePipe } from '@angular/common';

type SnapshotKey = keyof AnalysisSnapshot; //not sure if I did this right excluding id
@Component({
  selector: 'app-text-analyzer-history',
  imports: [DatePipe],
  template: `
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          @for (key of snapshotKeys; track key) {
            <th>{{ key }}</th>
          }
        </thead>
        <tbody>
          @for (snapshot of store.history(); track snapshot.id) {
            <tr>
              <td>{{ snapshot.savedAt | date }}</td>
              <td>{{ snapshot.excerpt }}</td>
              <td>{{ snapshot.wordCount }}</td>
              <td>{{ snapshot.charCount }}</td>
              <td>{{ snapshot.readingTimeSecs }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <button class="btn btn-sm mt-4" (click)="store.clearHistory()">Clear History</button>
  `,
  styles: ``,
})
export class History {
  protected store = inject(textAnalyzerStore);
  protected snapshotKeys: SnapshotKey[] = [
    'savedAt',
    'excerpt',
    'wordCount',
    'charCount',
    'readingTimeSecs',
  ];
}
