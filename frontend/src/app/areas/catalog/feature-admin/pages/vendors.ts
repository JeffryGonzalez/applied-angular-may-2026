import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/ui-page-header/page-header';

@Component({
  selector: 'app-admin-vendors',
  imports: [PageHeader],
  template: `
    <app-page-header title="Vendors" description="Vendor Management" />
    <div class="prose max-w-none"></div>
  `,
  styles: ``,
})
export class VendorsPage {}
