import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';
import { vendorsStore } from '../../data-catalog/vendors-store';
import { VendorList } from '../../ui-vendors/vendor-list';
import { VendorAdd } from '../../ui-vendors/vendor-add';

@Component({
  selector: 'app-admin-vendors',
  imports: [PageHeader, VendorList, VendorAdd],
  template: `
    <app-page-header title="Vendors" description="Vendor Management" />
    <div class="prose max-w-none">
      <app-admin-vendor-add />
      <app-vendors-list [vendors]="store.entities()" />
    </div>
  `,
  styles: ``,
})
export class VendorsPage {
  store = inject(vendorsStore);
}
