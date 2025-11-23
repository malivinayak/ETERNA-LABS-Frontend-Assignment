
/**
 * Simple in-memory cache with TTL support
 */
class Cache<T> {
  private store = new Map<string, { value: T; expiresAt: number }>();

  set(key: string, value: T, ttlMs: number = 5 * 60 * 1000): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  get(key: string): T | null {
    const item = this.store.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }

  clear(): void {
    this.store.clear();
  }
}

export const apiCache = new Cache();
