import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';

@Component({
  selector: 'app-admin-items-items',
  imports: [PageHeader],
  template: `
    <app-page-header title="Catalog Items" description="View Catalog Items" />
    <div class="prose max-w-none"></div>
  `,
  styles: ``,
})
export class ItemsPage {}
