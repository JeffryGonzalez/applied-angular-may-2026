/**
 * Active scenario selection for MSW handlers.
 * This file is written by msw-lens — do not edit manually.
 * Keys are "METHOD endpoint", values are scenario names defined in the handler.
 */
const activeScenarios: Record<string, string> = {
  'GET /api/resources': 'slow',
  'POST /api/resources': 'success',
  'GET https://news.hypertheory.com/angular': 'many-items',
};

export default activeScenarios;
