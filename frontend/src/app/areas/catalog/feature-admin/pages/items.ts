import { Component, effect, inject, input } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { vendorCatalogItemStore } from '../../data-catalog/vendor-catalog-item-store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-admin-items-items',
  imports: [PageHeader, JsonPipe],
  template: `
    <app-page-header title="Catalog Items" description="View Catalog Items" />
    <div class="prose max-w-none">
      <p>Showing the catalog items for that vendor</p>
      <pre>{{ store.entities() | json }}</pre>
    </div>
  `,
  styles: ``,
})
export class ItemsPage {
  id = input.required<string>(); // from the route parameter
  store = inject(vendorCatalogItemStore);

  constructor() {
    effect(() => {
      const id = this.id();
      this.store.getForVendor(id);
    });
  }
}
