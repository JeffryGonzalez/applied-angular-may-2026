import { Component, input } from '@angular/core';
import { VendorEntity } from '../data-catalog/types';

@Component({
  selector: 'app-vendors-list',
  imports: [],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      @for (vendor of vendors(); track vendor.id) {
        <div class="card card-border bg-base-100">
          <div class="card-body">
            <p class="card-title">{{ vendor.name }}</p>
            <p>{{ vendor.url }}</p>
            <p>Contact {{ vendor.pointOfContact.name }} at {{ vendor.pointOfContact.email }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class VendorList {
  vendors = input.required<VendorEntity[]>();
}
