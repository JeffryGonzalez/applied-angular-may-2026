import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { VendorEntity } from './types';

export const vendorsStore = signalStore(
  withEntities<VendorEntity>(),
  withMethods((store) => {
    return {
      _load: async () => {
        const vendors = await fetch('/api/vendors')
          .then((v) => v.json())
          .then((v) => v as VendorEntity[]);

        patchState(store, setEntities(vendors));
      },
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
