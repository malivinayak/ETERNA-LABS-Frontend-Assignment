/**
 * Guard to check if a value is one of the expected sort fields
 */
export const isSortField = (value: unknown): value is import('@/lib/redux/types').SortField => {
  return SORT_FIELDS.includes(value as any);
};

/**
 * Guard for token categories
 */
export const isTokenCategory = (value: unknown): value is import('@/lib/redux/types').TokenCategory => {
  return ['new-pairs', 'final-stretch', 'migrated'].includes(value as any);
};