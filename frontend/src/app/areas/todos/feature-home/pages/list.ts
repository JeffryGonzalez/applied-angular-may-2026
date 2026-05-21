import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { Filter, todosStore } from '../../data/store';

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
    <div class="join">
        @for (f of filters; track f) {
            <button
            class="btn btn-sm join-item"
            [class.btn-active]="store.filter() === f"
            (click)="store.setFilter(f)"
            >
            {{ f }}
            </button>
        }
    </div>
      <ul class="flex flex-col divide-y">
        @for (todo of store.visible(); track todo.id) {
          <li class="flex items-center gap-3 py-2">
            <input
                type="checkbox"
                class="checkbox"
                [checked]="todo.completed"
                (change)="store.toggle(todo.id)"
            />
            @if (editingId() === todo.id) {
                <input
                class="input input-bordered input-sm flex-1"
                autofocus
                [value]="editingDraft()"
                (input)="editingDraft.set($any($event.target).value)"
                (keydown.enter)="commitEdit(todo.id)"
                (keydown.escape)="cancelEdit()"
                (blur)="commitEdit(todo.id)"
                />
            } @else {
                <span
                class="flex-1 cursor-text"
                [class.line-through]="todo.completed"
                [class.opacity-60]="todo.completed"
                (dblclick)="startEdit(todo)"
                >
                {{ todo.title }}
                </span>
            }
            <button class="btn btn-ghost btn-xs" (click)="store.remove(todo.id)">✕</button>
            </li>
        } @empty {
          <li class="opacity-60 italic py-4">Nothing yet. Add one above.</li>
        }
      </ul>
    </div>
    <div class="flex items-center gap-4 pt-2 border-t text-sm">
    <label class="flex items-center gap-2 cursor-pointer">
        <input
        type="checkbox"
        class="checkbox checkbox-sm"
        [checked]="store.allComplete()"
        (change)="store.toggleAll($any($event.target).checked)"
        />
        <span>Toggle all</span>
    </label>

    <span class="opacity-70">
        {{ store.remaining() }} {{ store.remaining() === 1 ? 'item' : 'items' }} left
    </span>

    <span class="flex-1"></span>

    @if (store.completedCount() > 0) {
        <button class="btn btn-ghost btn-sm" (click)="store.clearCompleted()">
        Clear completed ({{ store.completedCount() }})
        </button>
    }
    </div>
  `,
})
export class ListPage {
  protected readonly store = inject(todosStore);
  protected readonly draft = signal('');
  protected readonly editingId = signal<string | null>(null);
  protected readonly editingDraft = signal('');
  protected readonly filters: Filter[] = ['all', 'active', 'completed'];

  protected add(): void {
    this.store.add(this.draft());
    this.draft.set('');
  }

  protected startEdit(todo: { id: string; title: string }): void {
    this.editingId.set(todo.id);
    this.editingDraft.set(todo.title);
  }

  protected commitEdit(id: string): void {
    this.store.rename(id, this.editingDraft());
    this.editingId.set(null);
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
  }   
}