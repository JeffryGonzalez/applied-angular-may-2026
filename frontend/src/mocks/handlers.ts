import { HttpHandler } from 'msw';

import resourcesHandler from './resources/resources';
import booksHandler from './books/books';
import newsHandler from './news/news';
import bypassed from './bypassed-endpoints';

const all: HttpHandler[] = [...resourcesHandler, ...booksHandler, ...newsHandler];

export const handlers: HttpHandler[] = all.filter((h) => {
  const { method, path } = h.info;
  if (typeof method !== 'string' || typeof path !== 'string') return true;
  return !bypassed.has(`${method} ${path}`);
});
