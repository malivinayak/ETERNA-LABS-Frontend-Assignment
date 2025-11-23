/**
 * Global application types and interfaces
 */

export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CacheMetadata {
  timestamp: number;
  ttl: number;
  etag?: string;
}