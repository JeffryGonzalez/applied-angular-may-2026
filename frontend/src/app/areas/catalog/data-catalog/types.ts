import * as z from 'zod/mini';

export const CatalogListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  vendor: z.string(),
});

export const CatalogListItemsSchema = z.array(CatalogListItemSchema);

export type CatalogListItem = z.infer<typeof CatalogListItemSchema>;

export type CatalogListItems = z.infer<typeof CatalogListItemsSchema>;

export type VendorEntity = {
  id: string;
  name: string;
  url: string;
  pointOfContact: {
    name: string;
    email: string;
    phone: string;
  };
};

export type VendorCreate = Omit<VendorEntity, 'id'>;
