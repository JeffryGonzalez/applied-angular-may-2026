import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { todosStore } from '../../todos/data/store';

interface NavMeta {
  label: string;
  icon?: string;
  parent?: string;
}

interface NavItem extends NavMeta {
  path: string;
}

@Component({
  selector: 'app-area-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div role="tablist" class="tabs tabs-border">
      @for (item of items(); track item.path) {
        <a
          role="tab"
          class="tab"
          [routerLink]="['.', ...itemSegments(item.path)]"
          routerLinkActive="tab-active"
          [routerLinkActiveOptions]="{ exact: item.path === '' }"
        >
          {{ item.label }} 
          @if (showCount(item.label, item.parent)) {
            ({{ todosCount() }})
          }
        </a>
      }
    </div>
  `,
})
export class AreaNav {
  private route = inject(ActivatedRoute);
  private todosStore = inject(todosStore);
  protected readonly todosCount = this.todosStore.total;
  
  protected items = computed<NavItem[]>(() => {
    const children = this.route.routeConfig?.children ?? [];
    return children
    .filter((c) => c.data?.['nav'])
    .map((c) => ({
      path: c.path ?? '',
      ...(c.data!['nav'] as NavMeta),
    }));;
  });
  
  protected itemSegments(path: string): string[] {
    return path === '' ? [] : path.split('/');
  }
  
  protected showCount(label: string, parent?: string): boolean {
    return label.toLowerCase() === 'list' && parent?.toLowerCase() === 'todos';
  }
}
