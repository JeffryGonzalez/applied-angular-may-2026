import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CatalogApi, VendorCatalogItem, VendorCatalogItemCreate } from './catalog-api';
import { inject } from '@angular/core';

import { switchMap, tap, pipe, mergeMap, map } from 'rxjs';
type CatalogItemRequest = {
  vendorId: string;
  item: VendorCatalogItemCreate;
};
export const vendorCatalogItemStore = signalStore(
  withEntities<VendorCatalogItem>(),
  withMethods((store) => {
    const apiService = inject(CatalogApi);
    return {
      addVendor: rxMethod<CatalogItemRequest>(
        pipe(
          mergeMap((v) =>
            apiService
              .addCatalogItemToVendor(v.vendorId, v.item)
              .pipe(tap((v) => patchState(store, addEntity(v)))),
          ),
        ),
      ),
      getForVendor: rxMethod<string>(
        pipe(
          switchMap((id) =>
            apiService
              .getCatalogItems(id)
              .pipe(tap((items) => patchState(store, setEntities(items)))),
          ),
        ),
      ),
    };
  }),
);
