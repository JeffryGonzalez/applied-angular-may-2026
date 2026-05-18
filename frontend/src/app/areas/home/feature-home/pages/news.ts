import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { NewsList } from '../ui/news-list';
import { NewsItem } from '../data/types';

@Component({
  selector: 'app-home-news',
  imports: [PageHeader, NewsList],
  template: `
    <app-page-header title="Angular News" description="Recent News About Angular" />
    <div class="prose max-w-none">
      <app-home-news-list [news]="newList" />
    </div>
  `,
  styles: ``,
})
export class NewsPage {
  newList: NewsItem[] = [
    {
      id: '1',
      title: 'Angular 22 Coming Soon',
      body: 'Angular is going to be released super soon!',
      published: '2026-05-18T15:48:12.499Z',
    },
    {
      id: '2',
      title: 'NGRX Signal Store Now Has Events',
      body: 'Signal Store has events, which makes it a replacement for NGRX store',
      published: '2026-05-18T15:48:12.499Z',
    },
  ];
}
