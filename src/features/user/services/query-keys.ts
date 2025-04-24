export const PURCHASE_QUERY_KEYS = {
  all: ['purchase'] as const,
  list: () => [...PURCHASE_QUERY_KEYS.all, 'list'],
};
