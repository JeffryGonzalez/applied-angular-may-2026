import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import {
  addEntity,
  removeEntities,
  removeEntity,
  updateAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Todo } from './types';

export const todosStore = signalStore(
  withEntities<Todo>(),
  withMethods((store) => ({
    add(title: string): void {
      const trimmed = title.trim();
      if (!trimmed) return;
      const id = crypto.randomUUID() as string;
      const todo: Todo = { id, title: trimmed, completed: false };
      patchState(store, addEntity(todo));
    },
    toggle(id: string): void {
      const current = store.entityMap()[id];
      if (!current) return;
      patchState(store, updateEntity({ id, changes: { completed: !current.completed } }));
    },
    rename(id: string, title: string): void {
      const trimmed = title.trim();
      if (!trimmed) {
        patchState(store, removeEntity(id));
        return;
      }
      patchState(store, updateEntity({ id, changes: { title: trimmed } }));
    },
    remove(id: string): void {
      patchState(store, removeEntity(id));
    },
    toggleAll(completed: boolean): void {
      patchState(store, updateAllEntities({ completed }));
    },
    clearCompleted(): void {
      patchState(store, removeEntities((t) => t.completed));
    },
  })),
  withComputed((store) => ({
    remaining: computed(() => store.entities().filter((t) => !t.completed).length),
    completedCount: computed(() => store.entities().filter((t) => t.completed).length),
    allComplete: computed(
      () => store.entities().length > 0 && store.entities().every((t) => t.completed),
    ),
  })),
);