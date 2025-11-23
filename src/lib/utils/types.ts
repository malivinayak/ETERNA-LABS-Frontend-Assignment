// src/lib/utils/types.ts
import { SORT_FIELDS } from './constants';


export const isSortField = (value: unknown): value is import('@/lib/redux/types').SortField => {
  return SORT_FIELDS.includes(value as any);
};

export const isTokenCategory = (value: unknown): value is import('@/lib/redux/types').TokenCategory => {
  return ['new-pairs', 'final-stretch', 'migrated'].includes(value as any);
};