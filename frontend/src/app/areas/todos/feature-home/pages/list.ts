import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { todosStore } from '../../data/store';

@Component({
  selector: 'app-todos-list',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Todos" />

    <div class="flex flex-col gap-2 max-w-xl">
      <input
        class="input input-bordered w-full"
        placeholder="What needs to be done?"
        [value]="draft()"
        (input)="draft.set($any($event.target).value)"
        (keydown.enter)="add()"
      />

      <ul class="flex flex-col divide-y">
        @for (todo of store.entities(); track todo.id) {
          <li class="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              class="checkbox"
              [checked]="todo.completed"
              (change)="store.toggle(todo.id)"
            />
            <span class="flex-1" [class.line-through]="todo.completed" [class.opacity-60]="todo.completed">
              {{ todo.title }}
            </span>
            <button class="btn btn-ghost btn-xs" (click)="store.remove(todo.id)">✕</button>
          </li>
        } @empty {
          <li class="opacity-60 italic py-4">Nothing yet. Add one above.</li>
        }
      </ul>
    </div>
  `,
})
export class ListPage {
  protected readonly store = inject(todosStore);
  protected readonly draft = signal('');

  protected add(): void {
    this.store.add(this.draft());
    this.draft.set('');
  }
}